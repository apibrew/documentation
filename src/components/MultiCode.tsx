import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import React from "react";

export interface MultiCodeProps {
    react: React.ReactNode;
    golang: React.ReactNode;
    java: React.ReactNode;
    javascript: React.ReactNode;
    python: React.ReactNode;
}

export function MultiCode(props: MultiCodeProps) {
    return (
        <Tabs>
            <TabItem value="react" label="React" default>
                <CodeBlock
                    language="jsx"
                    title="/src/index.tsx"
                    showLineNumbers>
                    {props.react}
                </CodeBlock>
            </TabItem>
            <TabItem value="typescript" label="JavaScript/Typescript">
                <CodeBlock
                    language="typescript"
                    title="/src/index.ts"
                    showLineNumbers>
                    {props.javascript}
                </CodeBlock>
            </TabItem>
            <TabItem value="java" label="Java">
                <CodeBlock
                    language="java"
                    title="/src/main/java/Application.java"
                    showLineNumbers>
                    {props.java}
                </CodeBlock>
            </TabItem>
            <TabItem value="python" label="Python">
                <CodeBlock
                    language="python"
                    title="/src/main.py"
                    showLineNumbers>
                    {props.python}
                </CodeBlock>
            </TabItem>
            <TabItem value="golang" label="Golang">
                <CodeBlock
                    language="go"
                    title="/main.go"
                    showLineNumbers>
                    {props.golang}
                </CodeBlock>
            </TabItem>
        </Tabs>
    );
}