//import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from '@sanity/client';


export const client = createClient({
  projectId: "qg37mdvm",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-11-18",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);