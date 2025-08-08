<h1>
    <a href="https://unified.to"><img src="https://unified.to/images/Unified_Logo_Black_White_Text.svg" /></a>
</h1>

# Unified.to's Authentication Component

## Installing

### Package manager

Using NPM:

```bash
$ npm install @unified-api/vuejs-authentication
```

Using yarn:

```bash
$ yarn add @unified-api/vuejs-authentication
```

Once the package is installed, you can import the component using `import`

```ts
import UnifiedAuthentication from '@unified-api/vuejs-authentication';
```

## Example

```vue
<template>
    <UnifiedAuthentication workspace_id="1235..." />
</template>

<script lang="ts">
import UnifiedAuthentication from '@unified-api/vuejs-authentication';
import '../node_modules/@unified-api/vuejs-authentication/dist/styles.css';

export default {
    components: {
        UnifiedAuthentication,
    },
};
</script>
```

The following are the `props` that can be passed to the component:

```ts
{
    // required
    workspace_id: String,

    // defaults to 'us' - used only with connection_id+api_token
    dc: String as PropType<'us' | 'eu' | 'au'>,

    environment: String,

    // descriptive title and description displaed before the list of links
    title: String,
    description: String,

    // success redirect URL, defaults to location.href
    // a `jwt` parameter will be sent to this URL that will contain { name, emails } which will be base64-encoded and signed by your workspace secret
    success_url: String,

    // failure redirect URL, defaults to location.href
    failure_url: String,

    // returned back to the sUrl and fURL
    state: String,

    // pre-text for login buttons (eg. to "Sign with " or "Continue with " )
    pretext: String,

    // defaults to true
    include_text: Boolean,
    // defaults to true
    include_icon: Boolean,
}
```
