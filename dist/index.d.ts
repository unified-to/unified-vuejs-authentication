import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PublicProps } from 'vue';

declare const _default: DefineComponent<ExtractPropTypes<    {
workspace_id: {
type: StringConstructor;
required: true;
};
dc: StringConstructor;
environment: StringConstructor;
title: StringConstructor;
description: StringConstructor;
success_url: StringConstructor;
failure_url: StringConstructor;
state: StringConstructor;
pretext: StringConstructor;
include_text: BooleanConstructor;
include_icon: BooleanConstructor;
error: StringConstructor;
}>, {
BUTTON_CONTAINER_CLASSES: string;
BUTTON_CLASSES_ICON: string;
BUTTON_CLASSES: string;
TITLE_CLASSES: string;
DESCRIPTION_CLASSES: string;
ERROR_CLASSES: string;
}, {
api_url: string;
authintegrations: IIntegration[] | undefined;
_include_text: true;
_include_icon: true;
_error: string | undefined;
}, {}, {
href(auth: Pick<IIntegration, "type">): string;
}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
workspace_id: {
type: StringConstructor;
required: true;
};
dc: StringConstructor;
environment: StringConstructor;
title: StringConstructor;
description: StringConstructor;
success_url: StringConstructor;
failure_url: StringConstructor;
state: StringConstructor;
pretext: StringConstructor;
include_text: BooleanConstructor;
include_icon: BooleanConstructor;
error: StringConstructor;
}>> & Readonly<{}>, {
include_text: boolean;
include_icon: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;

declare interface IIntegration {
    type: string;
    created_at?: string;
    updated_at?: string;
    name: string;
    is_active?: boolean;
    categories: TIntegrationCategory[];
    api_docs_url?: string;
    logo_url?: string;
    in_progress?: boolean;
    color?: string;
    text_color?: string;
    fa_icon?: string;
    token_names?: string[];
    token_instructions?: string[];
    web_url?: string;
    rate_limit_description?: string;
    beta?: boolean;
    support?: {
        [path in string]?: IIntegrationSupport;
    };
    tested_at?: string | Date | number;
    sandbox?: unknown;
    partnership?: unknown;
    description?: string;
    api?: unknown;
    featured?: boolean;
    popularity?: number;
    active_healthy_connections?: number;
}

declare interface IIntegrationSupport {
    methods?: {
        [path in string]?: boolean;
    };
    inbound_fields?: {
        [path in string]?: TSupportInboundType;
    };
    outbound_fields?: {
        [path in string]?: TSupportOutboundType;
    };
    webhook_events?: {
        [path in TWebhookEvent]?: TIntegrationSupportWebhookType[];
    };
    raw_objects?: string[];
    slow_fields?: string[];
    from_webhook?: TSupportInboundType;
    list_sort_by_name?: TSupportInboundType;
    list_sort_by_created_at?: TSupportInboundType;
    list_sort_by_updated_at?: TSupportInboundType;
    list_updated_gte?: TSupportInboundType;
    list_user_id?: TSupportInboundType;
    list_customer_id?: TSupportInboundType;
    list_company_id?: TSupportInboundType;
    list_contact_id?: TSupportInboundType;
    list_application_id?: TSupportInboundType;
    list_candidate_id?: TSupportInboundType;
    list_deal_id?: TSupportInboundType;
    list_job_id?: TSupportInboundType;
    list_invoice_id?: TSupportInboundType;
    list_order?: TSupportInboundType;
    list_query?: TSupportInboundType;
    list_limit?: TSupportInboundType;
    list_offset?: TSupportInboundType;
    search_twitter?: TSupportInboundType;
    search_name?: TSupportInboundType;
    search_linkedinurl?: TSupportInboundType;
    search_email?: TSupportInboundType;
    search_domain?: TSupportInboundType;
    list_parent_id?: TSupportInboundType;
    list_root_id?: TSupportInboundType;
    list_account_id?: TSupportInboundType;
    list_interview_id?: TSupportInboundType;
    list_list_id?: TSupportInboundType;
    list_ticket_id?: TSupportInboundType;
    list_collection_id?: TSupportInboundType;
    list_location_id?: TSupportInboundType;
    list_item_id?: TSupportInboundType;
    list_type?: TSupportInboundType;
    list_space_id?: TSupportInboundType;
    list_channel_id?: TSupportInboundType;
    list_page_id?: TSupportInboundType;
    list_link_id?: TSupportInboundType;
    list_project_id?: TSupportInboundType;
    list_item_variant_id?: TSupportInboundType;
    list_raw_fields?: TSupportInboundType;
    list_course_id?: TSupportInboundType;
    list_student_id?: TSupportInboundType;
    list_instructor_id?: TSupportInboundType;
    list_class_id?: TSupportInboundType;
    list_repo_id?: TSupportInboundType;
    list_org_id?: TSupportInboundType;
    list_calendar_id?: TSupportInboundType;
    list_event_id?: TSupportInboundType;
    list_task_id?: TSupportInboundType;
    virtual_webhook_updated_gte?: TSupportInboundType;
    virtual_webhook_limit?: TSupportInboundType;
    virtual_webhook_channel_id?: TSupportInboundType;
    virtual_webhook_parent_id?: TSupportInboundType;
    virtual_webhook_contact_id?: TSupportInboundType;
    virtual_webhook_deal_id?: TSupportInboundType;
    virtual_webhook_company_id?: TSupportInboundType;
    virtual_webhook_user_id?: TSupportInboundType;
    virtual_webhook_type?: TSupportInboundType;
    virtual_webhook_ticket_id?: TSupportInboundType;
    native_webhook_parent_id?: TSupportInboundType;
    native_webhook_project_id?: TSupportInboundType;
    virtual_webhook_job_id?: TSupportInboundType;
    list_start_gte?: TSupportInboundType;
    list_end_le?: TSupportInboundType;
    list_lead_id?: TSupportInboundType;
    list_call_id?: TSupportInboundType;
    list_document_id?: TSupportInboundType;
    list_payment_id?: TSupportInboundType;
    list_branch_id?: TSupportInboundType;
    list_expand_recurring_events?: TSupportInboundType;
    list_status?: TSupportInboundType;
    list_pipeline_id?: TSupportInboundType;
}

declare const IntegrationCategory: readonly ["passthrough", "hris", "ats", "auth", "crm", "enrich", "martech", "ticketing", "uc", "accounting", "storage", "commerce", "payment", "genai", "messaging", "kms", "task", "scim", "lms", "repo", "metadata", "calendar"];

declare const IntegrationSupportWebhookType: readonly ["virtual", "native"];

declare const SupportInboundType: readonly ["supported-required", "supported", "not-supported"];

declare const SupportOutboundType: readonly ["supported", "not-supported"];

declare type TIntegrationCategory = (typeof IntegrationCategory)[number];

declare type TIntegrationSupportWebhookType = (typeof IntegrationSupportWebhookType)[number];

declare type TSupportInboundType = (typeof SupportInboundType)[number];

declare type TSupportOutboundType = (typeof SupportOutboundType)[number];

declare type TWebhookEvent = (typeof WebhookEvent)[number];

declare const WebhookEvent: readonly ["updated", "created", "deleted"];

export { }
