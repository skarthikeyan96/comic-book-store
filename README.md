# Comic ⚡️ Store

Simple Ecommerce app built using Next.js , Supabase, Stripe and Material UI. 

# Features 

1. Standalone [admin](https://comic-book-store.vercel.app/products_admin) page ( publicly accessible ) 
2. Stripe Integration for checkout. 
3. Cart functionality.
4. User authentication with magic links. 

# Screenshots:

Admin panel: 

*View products*

![image](https://user-images.githubusercontent.com/23126394/208326617-026fd18b-33eb-4cfd-a7f1-2def450455d6.png)

*Update products*

![image](https://user-images.githubusercontent.com/23126394/208326646-fe8295f8-fb96-4be6-ab82-847a532da186.png)

*Create products*

![image](https://user-images.githubusercontent.com/23126394/208326748-3a53558f-ae12-4b18-a45d-beb8b98187eb.png)

End user 

*landing page* 

![image](https://user-images.githubusercontent.com/23126394/208326793-1396ffef-e2fa-4f55-ab5a-3223e2c6397a.png)

*product listing page* 

![image](https://user-images.githubusercontent.com/23126394/208326804-39f5c48e-21c8-4bde-9045-1a7306bada09.png)

*cart page* 

![image](https://user-images.githubusercontent.com/23126394/208326815-0ccf824d-dd3a-4923-b49a-4192f2865711.png)

*login page* 

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23126394/208326838-f0f13a10-d540-406b-9a64-e2498331e100.png">

*on clicking login*

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23126394/208326968-a01b0744-c7cd-404a-bec9-e88686e0dc2f.png">


*after login* 

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23126394/208327075-3f2acb2b-5b63-47d0-bd40-c1c4d64156aa.png">

*cart with products* 

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23126394/208327086-84f06537-e8fe-4b22-b734-858e097bc813.png">

*stripe page*

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/23126394/208327106-0c4eeecb-b90b-4e6e-8ff2-bff07cfac9bb.png">

*Twitter Status updates*
[https://twitter.com/karthik_coder/status/1604335717320396800](https://twitter.com/karthik_coder/status/1604335717320396800)

# Next steps

1. Show the products visited by the user in their profile page.
2. Show the products bought by the user. 


## Env keys

```shell

# `@supabase/supabase-js` install the library and add the following keys from supabase project 
NEXT_PUBLIC_SUPABASE_URL=https://app-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-api-key
STRIPE_SECRET_KEY=<API key from stripe>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<API key from stripe>
```
