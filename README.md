PAWPEDIA

Description :

A dog breed encyclopedia built with React. Pick any breed, explore its sub-breeds, and browse through images — plus a Hot or Not voting system because why not.

Features (Planned)
Core Features :

Browse all dog breeds from a dropdown
Nested sub-breed dropdown that updates based on selected breed
Image gallery for every breed and sub-breed
"Load More" button to progressively load images (9 at a time)
Random dog image generator with one click

Challenge Feature :

Hot or Not voting system — vote on individual dog photos and see a running score

Interactive Features :

Breed search/filter to quickly jump to a breed
Loading skeleton cards while images are being fetched
Error state handling for failed API calls

UI Features :

Responsive card-based layout for dog images
Large, friendly typography
Clean and minimal design with smooth loading states


API :
Dog CEO API — https://dog.ceo/dog-api/
EndpointUsage/api/breeds/list/allFetch all breeds + sub-breeds/api/breed/{breed}/imagesFetch images for a breed/api/breed/{breed}/{subbreed}/imagesFetch sub-breed images/api/breeds/image/randomRandom dog image

Tech Stack :

React (with Hooks — useState, useEffect)
JavaScript (ES6+)
CSS
Fetch API


Project Structure
breed-o-pedia/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── BreedSelector.jsx       # Breed + sub-breed dropdowns
│   │   ├── ImageCard.jsx           # Single dog image card with vote buttons
│   │   ├── ImageGallery.jsx        # Grid of ImageCards with Load More
│   │   └── RandomDog.jsx           # Random image generator
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.js
│
├── README.md
└── package.json

Future Enhancements :

Save favourite dog images (localStorage)
Share a dog image directly
Dark mode
Breed comparison side-by-side


Setup :

Clone the repository
Run npm install
Run npm start
Open http://localhost:3000 in your browser


No API keys needed — the Dog CEO API is completely free and public.


Author
Gyanam Talukdar
