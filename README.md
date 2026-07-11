<div align="center">

![Popcorn eating GIF](https://i.giphy.com/media/VojMyL1y0HrwSmPr62/giphy.gif)

*"This is all the seniors — watching, enjoying popcorn, while the juniors do the work."*

# Nova Studios

*Built by seniors. Broken (intentionally, mostly) for you to fix. Good luck.*

</div>

This is what the whole project is about — a fictional entertainment company website built with HTML and CSS. Nova Studios showcases movies, TV shows, animation, theme parks, and a streaming service (Nova+), and is set up as a practice ground for contributors to work on real front-end issues — layout bugs, broken links, typos, accessibility gaps, and small feature additions.

**Live site:** [archonbugs1.vercel.app](https://archonbugs1.vercel.app)

> The seniors wrote the code, disappeared, and left a README saying "good luck." This is that README.

## About

Nova Studios is a static multi-page site. There's no backend and no build step — every page is plain HTML and CSS, which makes it approachable for anyone starting out with open source or front-end development. The project intentionally ships with bugs and incomplete sections, tracked as GitHub issues, so contributors have real, scoped problems to solve.

> No JavaScript was harmed in the making of this repository. Mostly because there isn't any.

## Project Structure

```
NovaStudios/
├── index.html              Home page
├── about.html              Company overview
├── movies.html             Movie listings
├── news.html               News section
├── blog.html               Blog landing page
├── awards.html             Awards page
├── contact.html            Contact page
├── company/                About, history, leadership, careers, investors, etc.
├── entertainment/          TV shows, animation, streaming, theme parks, merchandise
├── blog/posts/             Individual blog posts
├── legal/                  Privacy policy, terms, accessibility
├── support/                Help center, FAQ
├── media/                  Gallery and media assets
├── css/                    Stylesheets
├── Asset/                  Images and other static assets
└── images/                 Site images
```

## Getting Started

No dependencies or build tools required.

1. Fork and clone the repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/NovaStudios.git
   cd NovaStudios
   ```
2. Open `index.html` directly in your browser, or serve the folder locally:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

That's it — edit any `.html` or `.css` file and refresh to see changes.

## Contributing

1. Check the [Issues](https://github.com/kartikktripathi/NovaStudios/issues) tab for something to work on, or open a new issue if you spot a bug that isn't listed. (Seniority comes with wisdom. Apparently not with closing tags.)
2. Fork the repo and create a branch for your fix:
   ```bash
   git checkout -b fix/short-description
   ```
3. Make your changes, keeping edits scoped to the issue you're addressing.
4. Commit with a clear message and push your branch.
5. Open a pull request referencing the issue number (e.g. `Fixes #12`).

Please keep PRs focused — one fix per pull request is easier to review and merge.

## Tech Stack

- HTML5
- CSS3
- No frameworks, no JavaScript build tooling — everything runs in the browser as-is

## License / Credits

Made for **Project Archon** open source challenge. Bugs are a feature. Fixes are your job.

Good luck. Read the code before you change it. Test your fix. Don't `@` the mentors at 3am.

— whoever left this mess for you to clean up 🎬
