<template>
    <div class="w-full">
        <h3 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h3>
        <p v-if="description" class="text-md mb-4">{{ description }}</p>

        <div v-if="_error" class="justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex">
            {{ _error }}
        </div>

        <div v-else class="flex flex-col gap-2">
            <a
                class="px-4 py-3 flex-nowrap font-medium select-none rounded justify-center items-center w-full inline-flex border hover:bg-blue-500 hover:text-black"
                v-for="auth of authintegrations"
                :href="href(auth)"
                :title="pretext ? `${pretext} ${auth.name}` : auth.name"
            >
                <img v-if="_include_icon" :src="auth.logo_url" class="w-5 h-5 mr-2" />

                <div v-if="_include_text" class="">
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
