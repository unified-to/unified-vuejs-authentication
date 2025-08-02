<template>
    <div class="flex flex-wrap">
        <div class="w-2/3">config...</div>
        <div v-if="authintegrations !== undefined" class="w-1/3">
            <h3 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h3>
            <p v-if="description" class="text-md">{{ description }}</p>

            <div v-if="error" class="justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex">
                {{ error }}
            </div>

            <div v-else class="flex flex-col gap-2">
                <a
                    class="px-4 py-3 flex-nowrap font-medium select-none rounded justify-center items-center w-full inline-flex border hover:bg-blue-500 hover:text-black"
                    v-for="auth of authintegrations"
                    :href="href(auth)"
                    :title="pretext ? `${pretext} ${auth.name}` : auth.name"
                >
                    <img v-if="include_icon" :src="auth.logo_url" class="w-5 h-5 mr-2" />

                    <div v-if="include_text" class="">
                        {{ pretext }}
                        {{ auth.name }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { type PropType } from 'vue';
import { type IIntegration } from '../models/Unified';
import { useRoute } from 'vue-router';

export default {
    name: 'UnifiedAuthentication',
    props: {
        workspace_id: {
            type: String,
            required: true,
        },
        dc: String as PropType<'us' | 'eu' | 'au' | '' | undefined>, // defaults to us
        environment: String,
        title: String,
        description: String,
        sUrl: String, // success redirect URL, defaults to location.href
        fUrl: String, // failure redirect URL, defaults to location.href
        scopes: Array as PropType<string[]>, // additinonal integration-specific permissions scopes
        state: String, // returned back to the sUrl and fURL
        pretext: String, // pre-text for login buttons (eg. to "Sign with " or "Continue with " )
        includeText: Boolean, // defaults to true
        includeIcon: Boolean, // defaults to true
    },
    setup() {
        const route = useRoute();
        const error = (route.query?.error as string) || '';
        return {
            error: error.replace('_', ' '),
        };
    },
    data() {
        const dc = (this.dc || 'us').toLowerCase();
        const api_url = dc === 'au' ? 'https://api-au.unified.to' : dc === 'eu' ? 'https://api-eu.unified.to' : 'https://api.unified.to';

        return {
            api_url,
            authintegrations: undefined as IIntegration[] | undefined,
            include_text: this.includeText !== false ? this.includeText : true,
            include_icon: this.includeIcon !== false ? this.includeIcon : true,
        };
    },
    methods: {
        href(auth: Pick<IIntegration, 'type'>) {
            const params = new URLSearchParams();
            params.append('redirect', 'true');
            if (this.sUrl) {
                params.append('success_redirect', this.sUrl);
            } else {
                params.append('success_redirect', location.href.split('?')[0]);
            }
            if (this.fUrl) {
                params.append('failure_redirect', this.fUrl);
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
