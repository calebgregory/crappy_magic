# CrappyMagic

## API Spec

```
GET /item/:number
  returns json formatted
{
  title <String>,
  owner_name <String>,
  owner_email <String>,
  video_creator_name <String>,
  video_creator_web_address <String>,
  video_creator_email <String>,
  video_creator_instagram_handle <String>,
  price <Float>,
  description <String>,
  materials <String>,
  manufacture_info <String>,
  mature_content <Boolean>
}
```

## Check it out

1. Start the client
```bash
$ bin/start_sample_client
```
2. Start the item server
```bash
$ bin/start_item_server
```
3. Start the video server
```bash
$ bin/start_video_server
```

Then hop on over to [the client](http://localhost:3001) and watch it
roll!
