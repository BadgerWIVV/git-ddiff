
# git ddiff

A better `git diff` for humans with lack of memory.


**Usage**

The usage of `git ddiff` is trying to reflect human
language and interaction with time.

Use case is, for example, a developer coming back to
work on monday:

```bash
# Today is Monday

git ddiff three days ago;
```

It also has simple usage for a yesterday's diff for
regular working code monkeys:

```bash
# Use morning, noon, evening, night, midnight
git ddiff yesterday morning;
```

**Supported Formats**

- `git ddiff yesterday`
- `git ddiff yesterday (morning | noon | evening | night | midnight)`
- `git ddiff <number> hours ago`
- `git ddiff <number> days ago`
- `git ddiff <number> weeks ago`
- `git ddiff <number> months ago`

Any `<number>` can be replaced with the language-equivalent
word. The `git-ddiff` command currently understands numbers
from `zero` to `thirty`.

Bigger numbers probably will cause headaches anyway.

Here are some examples:

```bash
git ddiff a month ago;
git ddiff two weeks ago;
git ddiff twenty-two hours ago;
git ddiff thirty minutes ago;
```

**Advanced Usage**

This might be obvious for some, but unknown to many.
You can use VIM to read a highlighted diff like so:

```bash
git ddiff yesterday morning | vim -;
```

# Installation

- Requirement is `node` v6 or newer (with const/let/arrow function support)

```bash
cd /path/to/git-ddiff-folder;

sudo cp ./git-ddiff.js /usr/bin/git-ddiff;
sudo chmod +x /usr/bin/git-ddiff;
```

# License

Same license as `git`, so it's licensed as `GNU GPL v2` and `GNU LGPL v2.1`.

If you want a different license, just contact [@cookiengineer](https://github.com/cookiengineer)
and we'll figure things out together.


# Work in Progress

I would love to get git's ncurses support for navigating in `vi`
working, but somehow node's stream pipes are fucked up. If you
have an idea how to fix that with piping, please let me know.

Of course, any improvements and pull-requests are always welcomed.
Let's make this project more awesome!

