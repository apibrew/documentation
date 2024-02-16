---
sidebar_position: 1
---

# Getting Started

## Getting started with _apbr_ (client tool)

### Installation

There are two ways to install _apbr_:

#### Download binary from [releases](https://github.com/apibrew/apibrew/releases/latest) page

- Go to [release page](https://github.com/apibrew/apibrew/releases/latest)
- Download apbr binary file apbr-linux-arm64, rename it to apbr
- Put it to bin folder



### Configuring

We are assuming you already have an **api-brew instance** running. If you don't have one, you can register in [our cloud](https://apibrew.io/docs/docs/cloud/getting-started) and get a free instance or you can install it [locally](https://apibrew.io/docs/on-prem/getting-started).

Now you need to configure _apbr_ to connect to your **api-brew instance**.

There are two ways to configure _apbr_:

You can configure _apbr_

```bash
apbr configure
Address: (your-project.api-brew.io:9443)
Username: (your username)
Password: (your password)
Insecure[false]: (false)
```

## Creating a simple resource

#### 1\. Declare book.yml

Let's define our first resource. We will create a **book** resource.  
We will define it in a file called **book.yml**

```yaml
type: resource
name: Book
title: Book
description: A book
types:
  - name: test1
    properties:
      testData:
        type: STRING
properties:
  title:
    type: STRING
    unique: true
    required: true
  description:
    type: STRING
  testProperty2:
    type: STRUCT
    typeRef: test1
```

#### 2\. Apply book.yml

Now we can apply this file to our **api-brew instance**

```bash
apbr apply -f book.yml
```

#### 3\. Create a book via REST API

Now we can create a book via REST API

```bash
curl -X POST http://localhost:8080/api/v1/books \
-d '{"title": "The Lord of the Rings", "description": "written by J. R. R. Tolkien"}'
```

#### 4\. List books

```bash
curl GET http://localhost:8080/api/v1/books
```

##### Result:

```json
{
  "content": [
    {
      "title": "The Lord of the Rings",
      "description": "written by J. R. R. Tolkien"
    }
  ]
}
```

#### You can also use swagger to operate with your resources:

Navigate to Swagger docs url  
**https://(project-name).apibrew.io:8443/docs/swagger/index.html**  
you need to replace (project-name) with your project name

![](https://apibrew.io/files/docs/getting-started/swagger-book.png)

## Code generation and usage in programming

#### 1\. Generate code

You can generate code for your resource

```bash
# java
apbr generate --platform="java" --apbr-server=66acfb --package=io.company.model --path=src/io/company/model

# typescript
apbr generate --platform="typescript" --apbr-server=66acfb --package=io.company.model --path=src/io/company/model

# javascript
apbr generate --platform="javascript" --apbr-server=66acfb --package=io.company.model --path=src/io/company/model

# python
apbr generate --platform="python" --apbr-server=66acfb --package=io.company.model --path=src/io/company/model
```

It will generate code for your resource in **book-client** folder

Book.java

Book.ts

Book.js

Book.py

```java
<!DOCTYPE html><html><head><meta charSet="utf-8"/><link rel="stylesheet" href="/_next/static/css/2c3182d7057ad6be.css" data-precedence="next"/><link rel="stylesheet" href="/_next/static/css/58726950e557ee05.css" data-precedence="next"/><meta name="robots" content="noindex"/><meta name="viewport" content="width=device-width, initial-scale=1"/><style data-emotion="css 1h3ujfp 131vvz7 1qsxih2 2z8cw6 ktj5ac m9lqyh 1r51nxy 1o70xks 1yom6ig 61sgt7">html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;-webkit-text-size-adjust:100%;}*,*::before,*::after{box-sizing:inherit;}strong,b{font-weight:700;}body{margin:0;color:#111927;font-size:1rem;font-weight:400;line-height:1.5;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";background-color:#fff;}@media print{body{background-color:#fff;}}body::backdrop{background-color:#fff;}*{box-sizing:border-box;}html{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;width:100%;}body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;min-height:100%;width:100%;}#root,#__next{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100%;width:100%;}#nprogress{pointer-events:none;}#nprogress .bar{height:3px;left:0;position:fixed;top:0;width:100%;z-index:2000;background-color:#6366F1;}.slick-dots li button:before{font-size:10px;color:#6366F1;}.slick-dots li.slick-active button:before{color:#6366F1;}.css-131vvz7{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;padding-top:80px;padding-bottom:80px;}.css-1qsxih2{width:100%;margin-left:auto;box-sizing:border-box;margin-right:auto;display:block;padding-left:16px;padding-right:16px;}@media (min-width:600px){.css-1qsxih2{padding-left:24px;padding-right:24px;}}@media (min-width:1200px){.css-1qsxih2{max-width:1200px;}}.css-2z8cw6{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;margin-bottom:48px;}.css-ktj5ac{height:auto;max-width:100%;width:400px;}.css-m9lqyh{margin:0;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:1.5rem;line-height:1.2;text-align:center;}@media (min-width:600px){.css-m9lqyh{font-size:1.6667rem;}}@media (min-width:900px){.css-m9lqyh{font-size:1.875rem;}}@media (min-width:1200px){.css-m9lqyh{font-size:2.0833rem;}}.css-1r51nxy{margin:0;font-size:1rem;font-weight:400;line-height:1.5;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";text-align:center;color:#6C737F;margin-top:4px;}.css-1o70xks{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;margin-top:48px;}.css-1yom6ig{font-weight:600;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";font-size:0.875rem;line-height:1.75;text-transform:uppercase;min-width:64px;padding:6px 8px;border-radius:8px;-webkit-transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color:#6366F1;border-radius:12px;text-transform:none;padding:8px 20px;padding:9px 16px;}.css-1yom6ig:hover{-webkit-text-decoration:none;text-decoration:none;background-color:rgba(99, 102, 241, 0.04);}@media (hover: none){.css-1yom6ig:hover{background-color:transparent;}}.css-1yom6ig.Mui-disabled{color:rgba(17, 25, 39, 0.38);}.css-61sgt7{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;background-color:transparent;outline:0;border:0;margin:0;border-radius:0;padding:0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;-moz-appearance:none;-webkit-appearance:none;-webkit-text-decoration:none;text-decoration:none;color:inherit;font-weight:600;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";font-size:0.875rem;line-height:1.75;text-transform:uppercase;min-width:64px;padding:6px 8px;border-radius:8px;-webkit-transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;color:#6366F1;border-radius:12px;text-transform:none;padding:8px 20px;padding:9px 16px;}.css-61sgt7::-moz-focus-inner{border-style:none;}.css-61sgt7.Mui-disabled{pointer-events:none;cursor:default;}@media print{.css-61sgt7{-webkit-print-color-adjust:exact;color-adjust:exact;}}.css-61sgt7:hover{-webkit-text-decoration:none;text-decoration:none;background-color:rgba(99, 102, 241, 0.04);}@media (hover: none){.css-61sgt7:hover{background-color:transparent;}}.css-61sgt7.Mui-disabled{color:rgba(17, 25, 39, 0.38);}</style><script src="/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js" noModule=""></script></head><body><main class="MuiBox-root css-131vvz7"><div class="MuiContainer-root MuiContainer-maxWidthLg css-1qsxih2"><div class="MuiBox-root css-2z8cw6"><img class="MuiBox-root css-ktj5ac" alt="Not found" src="/assets/errors/error-404.png"/></div><h4 class="MuiTypography-root MuiTypography-h4 MuiTypography-alignCenter css-m9lqyh">404: The page you are looking for isn’t here</h4><p class="MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter css-1r51nxy">You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.</p><div class="MuiBox-root css-1o70xks"><a class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-61sgt7" tabindex="0" href="/">Back to Home</a></div></div></main><div style="position:fixed;z-index:9999;top:16px;left:16px;right:16px;bottom:16px;pointer-events:none"></div><script src="/_next/static/chunks/webpack-ad0ad3f92aa0a11f.js" async=""></script><script src="/_next/static/chunks/bce60fc1-1a7675f0d8333687.js" async=""></script><script src="/_next/static/chunks/5769-60e1e67a34032494.js" async=""></script><script src="/_next/static/chunks/main-app-05fb63efd67faaa4.js" async=""></script><script>(self.__next_f=self.__next_f||[]).push([0])</script><script>self.__next_f.push([1,"1:HL[\"/_next/static/css/2c3182d7057ad6be.css\",{\"as\":\"style\"}]\n2:HL[\"/_next/static/css/58726950e557ee05.css\",{\"as\":\"style\"}]\n0:\"$L3\"\n"])</script><script>self.__next_f.push([1,"4:I{\"id\":68802,\"chunks\":[\"2272:static/chunks/webpack-ad0ad3f92aa0a11f.js\",\"9253:static/chunks/bce60fc1-1a7675f0d8333687.js\",\"5769:static/chunks/5769-60e1e67a34032494.js\"],\"name\":\"default\",\"async\":false}\n6:I{\"id\":14299,\"chunks\":[\"2272:static/chunks/webpack-ad0ad3f92aa0a11f.js\",\"9253:static/chunks/bce60fc1-1a7675f0d8333687.js\",\"5769:static/chunks/5769-60e1e67a34032494.js\"],\"name\":\"\",\"async\":false}\n7:I{\"id\":51509,\"chunks\":[\"8386:static/chunks/8386-0c8b0680989d61f9.js\",\"7622:static/chunks/7622-54915c332d476978."])</script><script>self.__next_f.push([1,"js\",\"7011:static/chunks/7011-1a1888554e15ef40.js\",\"7669:static/chunks/7669-fbcef43eadf438e9.js\",\"2467:static/chunks/2467-12e0b53fbb434abc.js\",\"7128:static/chunks/7128-5f5c50cfc89968fa.js\",\"8138:static/chunks/8138-9f7a98e5b35e00e5.js\",\"3185:static/chunks/app/layout-cccb84c4c646fafd.js\"],\"name\":\"Layout\",\"async\":false}\n9:I{\"id\":30326,\"chunks\":[\"8386:static/chunks/8386-0c8b0680989d61f9.js\",\"2882:static/chunks/2882-35d6bbb9ecef95e9.js\",\"7622:static/chunks/7622-54915c332d476978.js\",\"6062:static/chunks/6062-82f669"])</script><script>self.__next_f.push([1,"e23bcc9eaf.js\",\"3696:static/chunks/3696-74a6fcc0a6659b28.js\",\"5892:static/chunks/5892-dc8b44a58dc570bd.js\",\"9160:static/chunks/app/not-found-090a1c3e7acbbf67.js\"],\"name\":\"\",\"async\":false}\na:I{\"id\":48646,\"chunks\":[\"8386:static/chunks/8386-0c8b0680989d61f9.js\",\"7622:static/chunks/7622-54915c332d476978.js\",\"7011:static/chunks/7011-1a1888554e15ef40.js\",\"7669:static/chunks/7669-fbcef43eadf438e9.js\",\"2467:static/chunks/2467-12e0b53fbb434abc.js\",\"7128:static/chunks/7128-5f5c50cfc89968fa.js\",\"8138:static/chunks/813"])</script><script>self.__next_f.push([1,"8-9f7a98e5b35e00e5.js\",\"3185:static/chunks/app/layout-cccb84c4c646fafd.js\"],\"name\":\"NProgress\",\"async\":false}\nb:I{\"id\":13211,\"chunks\":[\"2272:static/chunks/webpack-ad0ad3f92aa0a11f.js\",\"9253:static/chunks/bce60fc1-1a7675f0d8333687.js\",\"5769:static/chunks/5769-60e1e67a34032494.js\"],\"name\":\"default\",\"async\":false}\nc:I{\"id\":5767,\"chunks\":[\"2272:static/chunks/webpack-ad0ad3f92aa0a11f.js\",\"9253:static/chunks/bce60fc1-1a7675f0d8333687.js\",\"5769:static/chunks/5769-60e1e67a34032494.js\"],\"name\":\"default\",\"async\":fals"])</script><script>self.__next_f.push([1,"e}\n"])</script><script>self.__next_f.push([1,"3:[[[\"$\",\"link\",\"0\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/2c3182d7057ad6be.css\",\"precedence\":\"next\"}],[\"$\",\"link\",\"1\",{\"rel\":\"stylesheet\",\"href\":\"/_next/static/css/58726950e557ee05.css\",\"precedence\":\"next\"}]],[\"$\",\"$L4\",null,{\"buildId\":\"F9jI3GqLJBmsyRkOWIa8K\",\"assetPrefix\":\"\",\"initialCanonicalUrl\":\"/files/docs/getting-started/book.java\",\"initialTree\":[\"\",{\"children\":[\"not-found\",{}]},\"$undefined\",\"$undefined\",true],\"initialHead\":[\"$L5\",null],\"globalErrorComponent\":\"$6\",\"notFound\":[\"$\",\"html\",null,{\"children\":[\"$\",\"body\",null,{\"children\":[\"$\",\"$L7\",null,{\"settings\":\"$undefined\",\"children\":[[\"$L8\",[],[\"$\",\"$L9\",null,{}]],[\"$\",\"$La\",null,{}]]}]}]}],\"asNotFound\":true,\"children\":[[\"$\",\"html\",null,{\"children\":[\"$\",\"body\",null,{\"children\":[\"$\",\"$L7\",null,{\"settings\":\"$undefined\",\"children\":[[\"$\",\"$Lb\",null,{\"parallelRouterKey\":\"children\",\"segmentPath\":[\"children\"],\"error\":\"$undefined\",\"errorStyles\":\"$undefined\",\"loading\":\"$undefined\",\"loadingStyles\":\"$undefined\",\"hasLoading\":false,\"template\":[\"$\",\"$Lc\",null,{}],\"templateStyles\":\"$undefined\",\"notFound\":[\"$\",\"$L9\",null,{}],\"notFoundStyles\":[],\"childProp\":{\"current\":\"$undefined\",\"segment\":\"not-found\"},\"styles\":[]}],[\"$\",\"$La\",null,{}]]}]}]}],null]}]]\n"])</script><script>self.__next_f.push([1,"8:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}],[\"$\",\"meta\",\"1\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}]]\n5:[[\"$\",\"meta\",\"0\",{\"charSet\":\"utf-8\"}],[\"$\",\"title\",\"1\",{\"children\":\"Api Brew\"}],[\"$\",\"meta\",\"2\",{\"name\":\"viewport\",\"content\":\"initial-scale=1, width=device-width\"}],[\"$\",\"meta\",\"3\",{\"property\":\"og:image\",\"content\":\"https://apibrew.io/ApiBrew%20Logo.svg\"}],[\"$\",\"meta\",\"4\",{\"name\":\"twitter:card\",\"content\":\"summary\"}],[\"$\",\"meta\",\"5\",{\"name\":\"twitter:image\",\"content\":\"https://apibrew."])</script><script>self.__next_f.push([1,"io/ApiBrew%20Logo.svg\"}],[\"$\",\"link\",\"6\",{\"rel\":\"icon\",\"href\":\"/favicon.ico\",\"type\":\"image/x-icon\"}]]\n"])</script></body></html>
```

#### 2\. Use generated code in your project

BookService.java

BookService.ts

BookService.js

BookService.py

```java
package io.company;

import io.apibrew.client.Client;
import io.apibrew.client.Repository;
import io.apibrew.company.model.Book;

import java.io.IOException;

public class BookService {

    public static void main(String[] args) throws IOException {
        Client client = Client.newClient();

        Repository<Book> repository = client.repository(Book.class);

        Book book = new Book();
        book.setTitle("test-title-123");

        repository.create(book);
    }
}
```