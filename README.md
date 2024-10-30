# Capix Software Engineer Take-home Challenge

Welcome to the Capix take-home challenge! We’re excited to see what you can build and hope you enjoy the process. In this exercise, you’ll create a full-stack web app that helps users quickly understand the content of files in a directory. You’ll have **2 days** to complete this, and we’re here to support you if any questions come up—just reach out to us at [tech@capix.ai](mailto:tech@capix.ai), we will do our best to respond to you promptly.

## **Project Overview**

In a fast-paced private equity firm, a analysts are often overwhelmed with the volume of documents that they need to read – ranging from detailed financial reports to legal agreements and due diligence papers – and when considering potential investments or managing portfolio companies, time is of the essence. Yet, combing through hundreds of pages to distill key insights can consume precious hours, leading to delays in decision-making and missed opportunities.

Building a web app for intelligent document-summarization is the first step in solving this challenge. Imagine an analyst who can upload an entire folder of deal-related documents and instantly receive a one-line summary for each, highlighting the core information. This would allow them to quickly grasp the subject of each document and better direct their attention to the documents that really matter for their analysis.

**Your challenge is to solve this problem by building a web app for intelligent document summarization**. The app will allow users to upload files and folders and get a one-line summary of each document. The goal is to create a seamless experience for user to interact with their files in an organized and intuitive way.

## **Requirements**

1. **File and Folder Upload and Management**
    1. Users can upload files.
    2. Users can upload ≥1 folders. Folders should include all nested sub-folders.
    3. Users can browse through the uploaded folders (”directories”) and files.
    4. Users can upload additional files to or delete files from existing directories.
    5. Users can upload files of various files but the application only accepts `.txt` files.
    6. Files and directories must persist across client sessions.
2. **File Summarization**
    1. Users can trigger intelligent summarization of files.
    2. Users can trigger intelligence summarization of directories.
    3. Summaries must be generated using a Large Language Model.
    4. Summaries must be one sentence.
    5. Summaries must be rendered to the client no more than 10s after the user triggers summarization.
    6. Summaries are expensive to compute so they must be memoized; the user cannot generate a summary for a given file / directory more than once.

## **Bonus**

If you’d like to go above and beyond, here are some additional features to implement:

1. **Custom Summarization:** Users can provide specific instructions for summarization
2. **Search Functionality:** User can search for files / directories based on their summaries.

## **Grading Criteria**

We want to give you insight into how we’ll review your submission:

1. **Functionality (40%)**
    1. Does the web app meet the requirements?
    2. Are all the features implemented correctly?
2. **User Experience (30%)**
    1. How easy is it to use the app?
    2. Is the interface intuitive and responsive?
3. **Code Quality (20%)**
    1. Is the code well-structured, modular, and readable?
    2. Are there meaningful comments and documentation where necessary?
4. **Scalability and Security (10%)**
    1. Did you consider scalability in your implementation (e.g., handling large uploads)?
    2. Are there appropriate security measures in place (e.g. file validation)?

## **Important Notes**

- **Tools and Libraries:** You’re required to use Next.js for the web app in addition to any open-source components, libraries, or AI tools you prefer.
- **Support:** If you have any questions during the implementation, don’t hesitate to reach out to [tech@capix.ai](mailto:tech@capix.ai).
- **Submission:** Please create a PR against the `main` branch of this repo. We will share our feedback in the PR review.
- **Feedbacks:** We understand that you’ve invested time and effort into this exercise, so we promise to provide feedback regardless of our hiring decision.
- **Next steps:** If your solution passed initial review, the next steps will be a technical deep dive with our co-founder and head of engineering to go over your solution. This will provide us an opportunity to hear your thoughts, decisions and challenges you encountered.

Good luck, and hope you enjoy this challenge!


## **Solution Instructions**

### Setup To Test

1. Clone https://github.com/ar-to/strapi-backend and run it. Refer to https://docs.strapi.io/dev-docs/quick-start. 
```shell
npm run develop
```
Opens http://localhost:1337/admin and create account. This sets it locally to project via sqlite db.

2. Create a API key for Google Gemini
Visit https://aistudio.google.com/app/apikey. 
```shell
 root .env of this project
API_KEY=AI...
```

3. Run the NextJs app in this repo.
```shell
npm run dev
```
Opens http://localhost:3000/ where you can start clicking around the navigation.

4. Create Content Type Collection inside Strapi for Records
5. Upload Files and Folders
Use the `samples` directory in this repo for quick tests or provide your own. They stay locally to the db.
6. Try Records and File Manager Pages

#### Other Resources
- https://strapi.io/blog/build-a-pdf-summarizer-in-nextjs-using-gemini-pdfjs-and-strapi - inspiration and borrowed some styles and early code
- https://ai.google.dev/pricing#1_5flash gemini pricing
- https://cloudconvert.com/pdf-to-txt
- https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes uses app router e.g. app/test/page.js → http://localhost:3000/test

### Notes About This Solution

I deliberately left logs as this project felt close to a prototype than production ready. Did not see that explicit in the requirements so I kept it flexible. That said with some tweaks this could be released live fairly easy/quick.

I picked https://strapi.io/ over using a cloud provider for sake of simplicity, speed and i happened to find a simple example that I liked. Plus I'm a fan of headless CMSs so wanted to try this one.

The use of https://ai.google.dev/gemini-api was also a bit arbitrary and coincidental and I had no preference except I do enjoy how fast it was to use via Google docs. 

Felt pretty good about the feature completion but did end up making a custom file manager to try and satisfy a few requirements. Could not find a ready made solution that kept it simple and free so this was my best attempt. 

I did attempt uploading files rather than just submitting text but I did not see much benefit at this stage and given that the requirements favored text it made sense. A likely improvement is to move to a vector db for more performance and to scale if this is to be taken further. 

Below are my notes on the requirements.

#### **Requirements**

1. **File and Folder Upload and Management**
    1. Users can upload files. **- done**
    2. Users can upload ≥1 folders. Folders should include all nested sub-folders. **- done**
    3. Users can browse through the uploaded folders (”directories”) and files. **- done**
    4. Users can upload additional files to or delete files from existing directories. **- done - this works by deleting the file tied to the record in the db. Directories in the file manager are generated by the paths of files at upload time so these automatically get deleted as well.I used my best judgement on this one.**
    5. Users can upload files of various files but the application only accepts `.txt` files. **- done**
    6. Files and directories must persist across client sessions. **- done**
2. **File Summarization**
    1. Users can trigger intelligent summarization of files. **- done**
    2. Users can trigger intelligence summarization of directories. **- close but plumbing is there**
    3. Summaries must be generated using a Large Language Model. **- done - via google gemini**
    4. Summaries must be one sentence. **- done**
    5. Summaries must be rendered to the client no more than 10s after the user triggers summarization. **- done - did test this but the code to check elapsed time was removed as I made changes.**
    6. Summaries are expensive to compute so they must be memoized; the user cannot generate a summary for a given file / directory more than once.**- done - summaries are persisted in a db and UX/UI prevents extra submissions**

#### **Bonus**

If you’d like to go above and beyond, here are some additional features to implement:
1. **Custom Summarization:** Users can provide specific instructions for summarization **- done - at the record page level a user can customize a prompt similar to a ai chatbox once as per other requirement above**
2. **Search Functionality:** User can search for files / directories based on their summaries. **- close but plumbing is there**

### **Grading Criteria**

We want to give you insight into how we’ll review your submission:

1. **Functionality (40%)**
    1. Does the web app meet the requirements? **- probably ~94%**
    2. Are all the features implemented correctly? **- I think so but you guys are the clients so let me know.**
2. **User Experience (30%)**
    1. How easy is it to use the app? **- pretty easy and intuitive. UX/UI is simple**
    2. Is the interface intuitive and responsive? **- intuitive yes, responsive a little. Felt out of scope to dedicate a lot of time on css.**
3. **Code Quality (20%)**
    1. Is the code well-structured, modular, and readable? **- yes**
    2. Are there meaningful comments and documentation where necessary? **- yes**
4. **Scalability and Security (10%)**
    1. Did you consider scalability in your implementation (e.g., handling large uploads)? **- I did. Goal was to prototype and learn fast while keeping scaling in mind as I built and tested features.**
    2. Are there appropriate security measures in place (e.g. file validation)? **- not much but its built to make it easy to apply security updates. e.g. backend role access to api, env vars, version control, possible encryption of text and other SOC2 best practices as needed.**

## **Important Notes**

- **Tools and Libraries:** You’re required to use Next.js for the web app in addition to any open-source components, libraries, or AI tools you prefer. **- done**
- **Support:** If you have any questions during the implementation, don’t hesitate to reach out to [tech@capix.ai](mailto:tech@capix.ai). **- felt mostly self-explanatory but I did take some liberties on implementation.**
- **Submission:** Please create a PR against the `main` branch of this repo. We will share our feedback in the PR review. **- done**
- **Feedbacks:** We understand that you’ve invested time and effort into this exercise, so we promise to provide feedback regardless of our hiring decision. **- appreciate it**
- **Next steps:** If your solution passed initial review, the next steps will be a technical deep dive with our co-founder and head of engineering to go over your solution. This will provide us an opportunity to hear your thoughts, decisions and challenges you encountered. **- sounds good**