<template>
    <div class="w-full ml:w-1/3 md:w-1/2 flex place-content-center min-h-screen items-center justify-center px-8 md:px-8">
        <div v-if="!authintegrations?.length" class="">⟳</div>

        <div v-else class="lg:w-2/3 sm:w-2/3 md:w-full w-full">
            <h3 v-if="title" class="text-xl font-bold">{{ title }}</h3>
            <p v-if="description" class="text-md">{{ description }}</p>

            <div v-if="error" class="justify-center items-center w-full py-8 font-semibold text-red-500 leading-5 tracking-tight inline-flex">
                {{ error }}
            </div>

            <div v-else class="">
                <a
                    class="my-1 flex-nowrap font-medium select-none rounded-lg justify-center items-center w-full inline-flex mb-2 mr-2 border bg-blue-500 text-white hover:bg-blue-700 text-white border-gray-500 hover:border-white"
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
    data() {
        const api_url = this.dc === 'au' ? 'https://api-au.unified.to' : this.dc === 'eu' ? 'https://api-eu.unified.to' : 'https://api.unified.to';

        const error = (useRoute().query?.error as string) || '';

        return {
            api_url,
            authintegrations: [] as IIntegration[],
            include_text: this.includeText !== false,
            include_icon: this.includeIcon !== false,
            error: error.replace('_', ' '),
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

            return `${this.api_url}unified/integration/login/${this.workspace_id}/${auth.type}?${params.toString()}`;
        },
    },
    async mounted() {
        this.authintegrations =
            (await (
                await fetch(
                    `${this.api_url}/unified/integration/workspace/${this.workspace_id}?categories=auth&active=true&summary=true&env=${this.environment}`
                )
            ).json()) || [];
    },
};
</script>
