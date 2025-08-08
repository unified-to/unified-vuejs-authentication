<template>
    <div class="unified-auth-container">
        <h3 v-if="title" class="auth-title">{{ title }}</h3>
        <p v-if="description" class="auth-description">{{ description }}</p>

        <div v-if="_error" class="auth-error">
            {{ _error }}
        </div>

        <div v-else class="button-container">
            <a class="auth-button" v-for="auth of authintegrations" :href="href(auth)" :title="pretext ? `${pretext} ${auth.name}` : auth.name">
                <img v-if="_include_icon" :src="auth.logo_url" class="button-icon" />

                <div v-if="_include_text" class="button-text">
                    {{ pretext }}
                    {{ auth.name }}
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { type IIntegration } from '../models/Unified';

export default {
    name: 'UnifiedAuthentication',
    props: {
        workspace_id: {
            type: String,
            required: true,
        },
        dc: String, // 'us' | 'eu' | 'au', defaults to us
        environment: String,
        title: String,
        description: String,
        success_url: String, // success redirect URL, defaults to location.href
        failure_url: String, // failure redirect URL, defaults to location.href
        state: String, // returned back to the sUrl and fURL
        pretext: String, // pre-text for login buttons (eg. to "Sign with " or "Continue with " )
        include_text: Boolean, // defaults to true
        include_icon: Boolean, // defaults to true
        error: String,
    },
    watch: {
        include_text(value) {
            this._include_text = value !== undefined ? value : true;
        },
        include_icon(value) {
            this._include_icon = value !== undefined ? value : true;
        },
    },
    data() {
        const dc = (this.dc || 'us').toLowerCase();
        const api_url = location.href.includes('localhost:')
            ? 'http://localhost:8000'
            : dc === 'au'
            ? 'https://api-au.unified.to'
            : dc === 'eu'
            ? 'https://api-eu.unified.to'
            : 'https://api.unified.to';

        return {
            api_url,
            authintegrations: undefined as IIntegration[] | undefined,
            _include_text: this.include_text !== false ? this.include_text : true,
            _include_icon: this.include_icon !== false ? this.include_icon : true,
            _error: this.error?.replace('_', ' '),
        };
    },
    methods: {
        href(auth: Pick<IIntegration, 'type'>) {
            const params = new URLSearchParams();
            params.append('redirect', 'true');
            if (this.success_url) {
                params.append('success_redirect', this.success_url);
            } else {
                params.append('success_redirect', location.href.split('?')[0]);
            }
            if (this.failure_url) {
                params.append('failure_redirect', this.failure_url);
            } else {
                params.append('failure_redirect', location.href.split('?')[0]);
            }
            if (this.state) {
                params.append('state', this.state);
            }
            if (this.environment && this.environment !== 'Production') {
                params.append('env', this.environment);
            }

            return `${this.api_url}/unified/integration/login/${this.workspace_id}/${auth.type}?${params.toString()}`;
        },
    },
    async mounted() {
        this.authintegrations =
            (await (
                await fetch(
                    `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment || ''}`
                )
            ).json()) || [];

        console.log(this.authintegrations);
    },
};
</script>

<style>
.unified-auth-container {
    width: 100%;
}

.unified-auth-container .auth-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.unified-auth-container .auth-description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.unified-auth-container .auth-error {
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
    font-weight: 600;
    color: #ef4444;
    line-height: 1.25;
    letter-spacing: -0.025em;
    display: inline-flex;
}

.unified-auth-container .button-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.unified-auth-container .auth-button {
    padding: 0.75rem 1rem;
    flex-wrap: nowrap;
    font-weight: 500;
    user-select: none;
    border-radius: 0.375rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    display: inline-flex;
    border: 1px solid #d1d5db;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.unified-auth-container .auth-button:hover {
    background-color: #3b82f6;
    color: #000000;
}

.unified-auth-container .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
}

.unified-auth-container .button-text {
    /* Additional styling for button text if needed */
}
</style>
