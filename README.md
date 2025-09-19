# SIM IT Club Website

This is the official website for the SIM IT Club, built with [Astro](https://astro.build/).

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) version `18.14.1` or higher.
- [pnpm](https://pnpm.io/) version `8.6.12` or higher.

It is recommended to use a Node.js version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/schniz/fnm) to manage your Node.js versions.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/simitclub/simitclub.github.io.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd simitclub.github.io
    ```
3.  Install the dependencies using pnpm:
    ```sh
    pnpm install
    ```

### Running the Development Server

To start the local development server, run the following command:

```sh
pnpm dev
```

This will start the server at `http://localhost:4321`. You can now view the site in your browser.

If you need to access the development server from other devices on the same network, use:

```sh
pnpm devh
```

## Workflow

This section explains how to manage the content of the website.

### Adding a New Blog Post

1.  Create a new Markdown file (`.md`) inside the `src/content/blog/` directory.
2.  The name of the file will be used as the URL slug. For example, `my-awesome-post.md` will be accessible at `/blog/my-awesome-post`.
3.  Add the required frontmatter at the top of the Markdown file. The frontmatter must include the following fields:

    ```yaml
    ---
    title: "My Awesome Post"
    description: "A short description of the post."
    pubDate: "YYYY-MM-DD"
    heroImage: "../../assets/images/blog/my-awesome-post.jpg" # Optional
    updatedDate: "YYYY-MM-DD" # Optional
    draft: false # Optional, set to true to hide the post from the blog index
    ---

    Your blog content in Markdown goes here.
    ```

    -   `title` (string, required): The title of the blog post.
    -   `description` (string, required): A brief description of the post for SEO and previews.
    -   `pubDate` (date, required): The publication date of the post.
    -   `heroImage` (image, optional): The main image for the post. It must be at least 1280 pixels wide. The path should be relative to the `src/content/blog/` directory.
    -   `updatedDate` (date, optional): If the post is updated, you can set the date here.
    -   `draft` (boolean, optional): Set to `true` if the post is not ready to be published. It will not appear on the main blog listing.

### Updating the "About" Page

The content for the "About" page is located in `src/pages/about.md`. You can edit this file directly to update the page.

### Building for Production

To create a production-ready build of the website, run the following command:

```sh
pnpm build
```

This command will check the code for errors and then build the static files into the `dist/` directory. You can preview the production build locally with `pnpm preview`.
