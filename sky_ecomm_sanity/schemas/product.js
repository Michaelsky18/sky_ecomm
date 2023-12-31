export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{type: 'image'}],
        option: {
          hotspot: true,
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
          name: 'slug',
          type: 'slug',
          title: 'Product Slug',
          options: {
              source: 'name',
              maxLength: 50,
          }
  
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'details',
        title: 'Details',
        type: 'text',
      },
    ],
  }
  