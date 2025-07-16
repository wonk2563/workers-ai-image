# Workers AI Image Playground

AI image generator using Cloudflare Workers AI.

## Run it

1. Clone
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Use it

Type stuff, pick a model, get an image. Download if you want.

## Problems
When you call the `await BUCKET.put(img)` command in `app/api/generate_image/route.ts`.<br>
You probably get this error.<br>
```plaintext
[DevalueError: Cannot stringify arbitrary non-POJOs]
```
This bug just happens in local development.<br>
When you deploy it to Cloudflare, it works fine.<br>

## Deploy

1. Create a Cloudflare R2 bucket<br>
```bash
npx wrangler@latest r2 bucket create ai-img
```

2. Create a Cloudflare Page name `ai-img` or what you want<br>

3. Create a secret `CLOUDFLARE_API_TOKEN` in the Cloudflare Page<br>
![](readme_image/2.png)

4. Create a Cloudflare API token<br>
![](readme_image/1.png)

5. Edit `wrangler.jsonc`、`wrangler.toml`<br>
```json
{
  "r2_buckets": [
    {
      "binding": "BUCKET", // Used in `route.ts` to call the bucket
      "bucket_name": "ai-img" 
    }
  ]
}
```
```toml
#:schema node_modules/wrangler/config-schema.json
name = "ai-img" # name of your Cloudflare Page
compatibility_date = "2024-09-25"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

[ai]
binding = "AI" # Used in `route.ts` to call the model

[[r2_buckets]]
bucket_name = "ai-img" # name of your Cloudflare R2 bucket
binding = "BUCKET" # Used in `route.ts` to call the bucket

[vars]
CLOUDFLARE_ACCOUNT_ID = "" # Your Cloudflare account ID
```

6. Edit `.dev.vars.example`<br>
```plaintext
# Example Cloudflare API token
# Generated on Cloudflare dashboard with "Workers AI" edit access
CLOUDFLARE_API_TOKEN=""
CLOUDFLARE_ACCOUNT_ID=""
```

7. Rename `.dev.vars.example` to `.dev.vars`<br>

8. Edit `.env.example`<br>
```plaintext
CLOUDFLARE_API_TOKEN=""
CLOUDFLARE_ACCOUNT_ID=""
```

9. Rename `.env.example` to `.env`<br>

10. Deploy with `npm run deploy` or `docker compose up -d`
