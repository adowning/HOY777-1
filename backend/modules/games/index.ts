
import { Hono } from 'hono';

const app = new Hono();

app.get('/categories', (c) => {
    const type = c.req.query('type');
    if (type === 'providers') {
        return c.json({
            "code": 0,
            "data": [
                {
                    "id": 1,
                    "name": "All",
                    "slug": "all",
                    "icon": ""
                }
            ],
            "message": "Success"
        });
    }
    return c.json({
        "code": 0,
        "data": [
            {
                "id": 1,
                "name": "All",
                "slug": "all",
                "icon": ""
            }
        ],
        "message": "Success"
    });
});

app.get('/search', (c) => {
    return c.json({
        "code": 0,
        "data": {
            "data": [],
            "total": 0,
            "page": 1,
            "limit": 4
        },
        "message": "Success"
    });
});

export default app;
