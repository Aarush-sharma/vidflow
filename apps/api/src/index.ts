import { RoomManager } from "@repo/store/index";
import { Hono } from 'hono'


const app = new Hono();

const roomManager = RoomManager.getInstance()

app.get("/", async (c) => {
    const key = c.req.query("key");
    if (key) {
        const text = await roomManager.getId(key);
        console.log(text);
        return c.json(text);
    } else if (typeof key == "undefined") {
        return c.json({ msg: "hi there" });
    }
});

app.all('/hello', (c) => c.text('Any Method /hello'))

Bun.serve({
    fetch: app.fetch,
    port: 8080,
})

export default app;