import React from 'react'
import CardBlogComponent from '@/components/Components/CardComponents/CardBlogComponent'
import Categories from '@/components/Components/CardComponents/CategoryComponent'
import CardBlogHorizontal from '@/components/Components/CardComponents/CardBlogHorizontal'


const categoriesList = [
  'All',
  'Business',
  'Technology',
  'Healthy Food',
  'Education',
]

const sliderData = [
  {
    id: "1",
    tag: 'Healthy food',
    description:
      'Learn how to enjoy healthy meals without spending hours in the kitchen!',
    image: '/assets/healthy-food.jpg',
    author: 'Mason Eduard',
    date: '23 Jan 2025',
    view: 1049,
    profile: '/assets/blog.jpg',
  },
  {
    id: "2",
    tag: 'Travel',
    description:
      'Discover lesser-known attractions and explore Europe like a local.',
    image: '/assets/healthy-food.jpg',
    author: 'Alexandra Doe',
    date: '15 Feb 2025',
    view: 876,
    profile: '/assets/blog.jpg',
  },
  {
    id: "3",
    tag: 'Technology',
    description:
      'Explore how artificial intelligence is transforming our daily routines.',
    image: '/assets/healthy-food.jpg',
    author: 'John Smith',
    date: '10 Mar 2025',
    view: 1345,
    profile: '/assets/blog.jpg',
  },
  {
    id: "4",
    tag: 'Fitness',
    description:
      'Boost your fitness routine with these highly effective exercises.',
    image: '/assets/healthy-food.jpg',
    author: 'Emma Johnson',
    date: '05 Apr 2025',
    view: 945,
    profile: '/assets/blog.jpg',
  },
  {
    id: "5",
    tag: 'Food',
    description:
      'Explore a variety of tasty and healthy vegan recipes for any occasion.',
    image: '/assets/healthy-food.jpg',
    author: 'Michael Brown',
    date: '22 May 2025',
    view: 1120,
    profile: '/assets/blog.jpg',
  },
]

const page = () => {
  return (
    <section>
      <div className="overflow-x-auto whitespace-nowrap space-x-4 p-4 gap-10">
        {sliderData.map((card) => (
          <div className="inline-block" key={card.id}>
            <CardBlogComponent {...card} />
          </div>
        ))}
      </div>
      <div className="p-4">
        <Categories categories={categoriesList} />
      </div>
      <div className="p-4 ">
        {sliderData.map((card) => (
          <CardBlogHorizontal
            id={card.id}
            tag={card.tag}
            date={card.date}
            view={card.view}
            title={card.description}
            image={card.image}
          />
        ))}
      </div>
    </section>
  )
}

export default page;
