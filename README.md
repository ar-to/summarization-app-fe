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
    2. Are there appropriate security measures in place (e.g., authentication, file validation)?

## **Important Notes**

- **Tools and Libraries:** You’re required to use Next.js for the web app in addition to any open-source components, libraries, or AI tools you prefer.
- **Support:** If you have any questions during the implementation, don’t hesitate to reach out to [tech@capix.ai](mailto:tech@capix.ai).
- **Submission:** Please create a PR against the `main` branch of this repo. We will share our feedback in the PR review.
- **Feedbacks:** We understand that you’ve invested time and effort into this exercise, so we promise to provide feedback regardless of our hiring decision.
- **Next steps:** If your solution passed initial review, the next steps will be a technical deep dive with our co-founder and head of engineering to go over your solution. This will provide us an opportunity to hear your thoughts, decisions and challenges you encountered.

Good luck, and hope you enjoy this challenge!
