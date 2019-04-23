## Game of Life

#### Written in Javascript with HTML5 canvas

As a fun project post-Makers, I wanted to brush up my JavaScript and explore something new and widely applicable, so I looked to HTML5 canvas for inspiration. I chose Game of Life as it's fun, combines visuals with logic and can be deceptively complex.
This is based on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

#### Learning objectives

- Improve JavaScript knowledge
- Understand how to run ES6+ code in browsers
- Explore the basics of HTML5 Canvas
- Do something fun 

#### Approach

As I wanted to use JavaScript classes and other ES6+ functionality, that meant using a transpiler to convert the javascript into browser-acceptable code. I looked at `Babel` but then decided to go with `Parcel` as it was fast, handled `Babel` for me and also allowed bundling of assets out of the box, should it become needed. 

I wanted to TDD the business logic, so used `jasmine` for unit and feature tests and `eslint` for to help reinforce my understanding of style conventions.

I decided against testing the HTML5 Canvas output directly, so tests are generally directed at the functionality of the `Board` and `Cell` classes rather than the `Game` class.

