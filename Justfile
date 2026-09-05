start:
    pnpm run dev

build:
    pnpm run build

preview: build
    pnpm run preview

poast *title:
    pnpm run poast -- {{title}}
