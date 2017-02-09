# CrappyMagic

## API Spec

``
GET /item/:number
  returns json formatted
{
  title <String>,
  owner: {
    name <String>,
    email <String>
  },
  videoCreator: {
    name <String>,
    webAddress <String>,
    email <String>,
    instagramHandle <String>,
  },
  price <Float>,
  description <String>,
  materials <String>,
  manufactureInfo <String>
}
```
