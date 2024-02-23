import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    main: [
        {
            type: 'category',
            label: '🚀 Getting Started',
            items: [
                {
                    type: 'doc',
                    label: 'Introduction',
                    id: 'getting-started/intro',
                },
                {
                    type: 'doc',
                    label: 'Quick Start Guide',
                    id: 'getting-started/quick-start-guide',
                },
                {
                    type: 'doc',
                    label: 'Setup Local Instance',
                    id: 'getting-started/local-instance',
                },
            ],
        },
        {
            type: 'category',
            label: 'Tutorial',
            items: [
                'tutorials/simple-react-app',
                'tutorials/simple-chat-app',
                'tutorials/task-scheduler',
                'tutorials/taxi-fare-calculator',
                'tutorials/wallet',
            ],
        },
        {
            type: 'category',
            label: 'Fundamentals',
            items: [
                'fundamentals/the-big-picture',
                'fundamentals/authentication',
                'fundamentals/resource',
                'fundamentals/record',
                'fundamentals/namespace',
                'fundamentals/authorization',
                'fundamentals/extension',
                'fundamentals/annotations',
                'fundamentals/miscellaneous',
            ],
        },
        {
            type: 'category',
            label: 'Nano Code',
            items: [
                'nano/getting-started',
                'nano/resource',
                'nano/lambda',
                'nano/http',
                'nano/mail',
                'nano/global',
                'nano/low-level',
            ],
        },
        {
            type: 'category',
            label: 'SDK',
            items: ['nano/mail'],
        },
        {
            type: 'category',
            label: 'CLI [ apbr ]',
            items: ['nano/mail'],
        },
        {
            type: 'category',
            label: 'Deployment',
            items: ['nano/mail'],
        },
        {
            type: 'category',
            label: 'Cloud',
            items: ['nano/mail'],
        },
        {
            type: 'category',
            label: 'Internals',
            items: ['nano/mail'],
        },
    ],
};

export default sidebars;
