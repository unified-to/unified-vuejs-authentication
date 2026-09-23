<template>
    <div class="unified-auth-container" :data-theme="theme === 'auto' ? undefined : theme">
        <div class="auth-card">
            <header v-if="title || description" class="auth-header">
                <h3 v-if="title" class="auth-title">{{ title }}</h3>
                <p v-if="description" class="auth-description">{{ description }}</p>
            </header>

            <div v-if="_error" class="auth-error" role="alert">
                {{ _error }}
            </div>

            <div v-else class="button-container">
                <a
                    class="auth-button"
                    v-for="auth of authintegrations"
                    :key="auth.type"
                    :href="href(auth)"
                    :title="pretext ? `${pretext} ${auth.name}` : auth.name"
                >
                    <img v-if="_include_icon" :src="auth.logo_url" :alt="''" class="button-icon" />

                    <span v-if="_include_text" class="button-text">
                        <template v-if="pretext">{{ pretext }} </template>{{ auth.name }}
                    </span>
                </a>
            </div>
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
        // 'auto' follows prefers-color-scheme; 'light' | 'dark' force a theme
        theme: {
            type: String,
            default: 'auto',
            validator: (value: string) => ['auto', 'light', 'dark'].includes(value),
        },
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
    --ua-bg: #ffffff;
    --ua-fg: #212126;
    --ua-muted: #747686;
    --ua-border: #e5e5e5;
    --ua-border-hover: #d4d4d8;
    --ua-hover: #f7f7f8;
    --ua-active: #f0f0f2;
    --ua-error: #ef4444;
    --ua-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
    --ua-ring-offset: #ffffff;
    --ua-ring: rgba(33, 33, 38, 0.35);
    --ua-radius-card: 0.75rem;
    --ua-radius-control: 0.5rem;
    --ua-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;

    box-sizing: border-box;
    width: 100%;
    font-family: var(--ua-font);
    color: var(--ua-fg);
    color-scheme: light;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

@media (prefers-color-scheme: dark) {
    .unified-auth-container:not([data-theme='light']) {
        --ua-bg: #212126;
        --ua-fg: #f8f8f8;
        --ua-muted: #a1a1aa;
        --ua-border: #3f3f46;
        --ua-border-hover: #52525b;
        --ua-hover: #2c2c32;
        --ua-active: #35353c;
        --ua-error: #f87171;
        --ua-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.45);
        --ua-ring-offset: #212126;
        --ua-ring: rgba(248, 248, 248, 0.35);
        color-scheme: dark;
    }
}

.unified-auth-container[data-theme='dark'] {
    --ua-bg: #212126;
    --ua-fg: #f8f8f8;
    --ua-muted: #a1a1aa;
    --ua-border: #3f3f46;
    --ua-border-hover: #52525b;
    --ua-hover: #2c2c32;
    --ua-active: #35353c;
    --ua-error: #f87171;
    --ua-shadow: 0 1px 2px rgba(0, 0, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.45);
    --ua-ring-offset: #212126;
    --ua-ring: rgba(248, 248, 248, 0.35);
    color-scheme: dark;
}

.unified-auth-container[data-theme='light'] {
    color-scheme: light;
}

.unified-auth-container *,
.unified-auth-container *::before,
.unified-auth-container *::after {
    box-sizing: border-box;
}

.unified-auth-container .auth-card {
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;
    padding: 2rem;
    background: var(--ua-bg);
    border: 1px solid var(--ua-border);
    border-radius: var(--ua-radius-card);
    box-shadow: var(--ua-shadow);
}

.unified-auth-container .auth-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.unified-auth-container .auth-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
    color: var(--ua-fg);
}

.unified-auth-container .auth-description {
    margin: 0.5rem 0 0;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.45;
    color: var(--ua-muted);
}

.unified-auth-container .auth-error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1.25rem 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ua-error);
}

.unified-auth-container .button-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.unified-auth-container .auth-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.625rem 1rem;
    background: var(--ua-bg);
    border: 1px solid var(--ua-border);
    border-radius: var(--ua-radius-control);
    color: var(--ua-fg);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25;
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.unified-auth-container .auth-button:hover {
    background: var(--ua-hover);
    border-color: var(--ua-border-hover);
    color: var(--ua-fg);
}

.unified-auth-container .auth-button:active {
    background: var(--ua-active);
}

.unified-auth-container .auth-button:focus {
    outline: none;
}

.unified-auth-container .auth-button:focus-visible {
    border-color: var(--ua-fg);
    box-shadow: 0 0 0 2px var(--ua-ring-offset), 0 0 0 4px var(--ua-ring);
}

.unified-auth-container .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    object-fit: contain;
}

.unified-auth-container .button-text {
    display: inline;
}

@media (prefers-reduced-motion: reduce) {
    .unified-auth-container .auth-button {
        transition: none;
    }
}
</style>
