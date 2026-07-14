import { Trip } from "@/types/trip";
import { CurrencyType } from "@/types/currency";

export const sampleTrip = {
  __typename: "Trip",
  sys: {
    __typename: "Sys",
    id: "4reaUUm6ksYRCHbhjpuI61",
  },
  location: "Paris, France",
  currency: "GBP" as CurrencyType,
  soldOut: false,
  travelWithOwners: false,
  isFeaturedTrip: true,
  bannerImagesCollection: {
    __typename: "AssetCollection",
    items: [
      {
        __typename: "Asset",
        title: "Paris 1",
        description: "",
        contentType: "image/png",
        fileName: "Rectangle 8.png",
        size: 511360,
        url: "https://images.ctfassets.net/bi3cvaccr24r/5fjiUymWFJEMgYXsYHBrmR/52f7307e5c02d3de8e4c9b4e7614b57c/Rectangle_8.png",
        width: 581,
        height: 537,
      },
    ],
  },
  startDate: "2024-11-16T00:00:00.000Z",
  endDate: "2024-11-30T00:00:00.000Z",
  description:
    "Enjoy a trip to Paris with flight and accommodation inclusive. On this trip you get to experience the best of Paris, from the culture to the nifghtlife and then the adventure as a while.",
  fullAmount: 6500,
  discount: null,
  whatsNotIncluded: null as Array<{ title: string }> | null,
  groupSize: null as string | null,
  whatsIncluded: [
    {
      icon: "https://img.icons8.com/?size=100&id=UdCbQRjRZ92P&format=png&color=000000",
      title: "Testing",
      isHighlighted: "false",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=SCVYMukedO06&format=png&color=000000",
      title: "Has cover included",
      isHighlighted: "false",
    },
    {
      icon: "https://img.icons8.com/?size=100&id=GR1wVjVCAV2R&format=png&color=000000",
      title: "Free write up",
      isHighlighted: "true",
    },
  ],
  slots: null,
  downPayment: 300,
  installments: [
    {
      date: "10-24-2024",
      type: "installment",
      amount: "1550",
      installment_number: "1",
    },
    {
      date: "15-24-2024",
      type: "installment",
      amount: "1550",
      installment_number: "2",
    },
    {
      date: "20-24-2024",
      type: "installment",
      amount: "1550",
      installment_number: "3",
    },
    {
      date: "10-24-2024",
      type: "installment",
      amount: "1550",
      installment_number: "4",
    },
  ],
  itinerary: [
    {
      day: "1",
      activity: "Testing",
      coverImage:
        "https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=1024x1024&w=is&k=20&c=Qr-pV4lgJvQ77SCv1MH0o61dZlT_LJSRuH_NLfyqY_0=",
    },
    {
      day: "2",
      activity: "Testing 2",
      coverImage:
        "https://media.istockphoto.com/id/182188515/photo/analyzing-samples.jpg?s=1024x1024&w=is&k=20&c=mE-5j5UEZyqtuLgamBChhfVaozdF8sURgLNKSJyNFRk=",
    },
    {
      day: "3",
      activity: "Testing 3",
      coverImage:
        "https://media.istockphoto.com/id/172980469/photo/rainbow-colored-fan.jpg?s=1024x1024&w=is&k=20&c=cf5wNKrRhnxWFWOSMLn8w0CpHlSS03EuINeuy0L7Tgg=",
    },
  ],
  viewsOfLocationCollection: {
    __typename: "AssetCollection",
    items: [
      {
        __typename: "Asset",
        title: "paris_views1",
        description: "",
        contentType: "image/png",
        fileName: "Frame 31056.png",
        size: 165271,
        url: "https://images.ctfassets.net/bi3cvaccr24r/5JaXtmVvR7qjDHPd7WN7eH/5db3aec480de5e23ade0173a82ced952/Frame_31056.png",
        width: 394,
        height: 279,
      },
      {
        __typename: "Asset",
        title: "paris_views2",
        description: "",
        contentType: "image/png",
        fileName: "Frame 31062.png",
        size: 62703,
        url: "https://images.ctfassets.net/bi3cvaccr24r/1PVcxkBIknY2tm2Ue4vmit/0257db1ca9f5f9c6b8b128f428deaba6/Frame_31062.png",
        width: 296,
        height: 279,
      },
      {
        __typename: "Asset",
        title: "paris_view3",
        description: "",
        contentType: "image/png",
        fileName: "Frame 31061.png",
        size: 195250,
        url: "https://images.ctfassets.net/bi3cvaccr24r/ql1xFs1rT98HLCROnj7gS/882a33bb6972e35113cf593e0f76c2f4/Frame_31061.png",
        width: 394,
        height: 279,
      },
    ],
  },
};

export const dummyCartTrips: Trip[] = [
  {
    id: 1,
    isBooked: false,
    quantity: 1,
    price: 200,
    startDate: "2022-12-01",
    endDate: "2022-12-12",
    year: "2022",
    image: null,
    location: "Paris, France",
    totalQuantity: 10,
  },
  {
    id: 2,
    isBooked: false,
    quantity: 1,
    price: 300,
    startDate: "2022-12-01",
    endDate: "2022-12-12",
    year: "2022",
    image: null,
    location: "Madrid, Spain",
    totalQuantity: 5,
  },
  {
    id: 3,
    isBooked: false,
    quantity: 1,
    price: 500,
    startDate: "2022-12-01",
    endDate: "2022-12-12",
    year: "2022",
    image: null,
    location: "London, UK",
    totalQuantity: 10,
  },
  {
    id: 4,
    isBooked: false,
    quantity: 1,
    price: 400,
    startDate: "2022-12-01",
    endDate: "2022-12-12",
    year: "2022",
    image: null,
    location: "Doha, Qatar",
    totalQuantity: 15,
  },
];
