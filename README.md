This is just an example around some ideas for [easywasi](https://github.com/konsumer/easywasi).

It uses [browser-wasi-shim](https://github.com/bjorn3/browser_wasi_shim) to handle WASI, and connects a [zen-fs](https://github.com/zen-fs/core) filesystem.

It works, but has some downsides:

- not very configurable
- does not access filesystems directly (loads zip at startup)
- a lot of duplication of code (virtual fs mixed with zenfs)

Overall it works ok, but I am wokring on improving these things, and use this project as reference.
