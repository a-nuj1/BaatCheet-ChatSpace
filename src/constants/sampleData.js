export const sampleChats = [
  {
    avatar: ["https://randomuser.me/api/portraits"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://randomuser.me/api/portraits",
     
    ],
    name: "John ",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];


export const sampleUsers = [
  {
    avatar: "https://randomuser.me/api/portraits",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://randomuser.me/api/portraits",
    name: "John Boii",
    _id: "2",
  },

]

export const sampleNotifications = [
  {
    sender:{
      avatar: "https://randomuser.me/api/portraits",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender:{
      avatar: "https://randomuser.me/api/portraits",
      name: "John Boii",
    },
    _id: "2",
  },
];



export const sampleMessage = [
  {
    attachments:[],

    content: 'lwde ki sarkar hai...',
    _id: 'bcdedf',
    sender:{
      _id: 'user._id',
      name: 'chaman',
    },
    chat: 'chatId',
    createdAt: '2024-10-06T18:30:00.000Z'
  },
  {
    attachments:[
      {
        public_id: 'ab2',
        url: 'https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg',
      },
    ],

    // content: 'lwde ki ki sarkar hai...',
    _id: 'bcdedfdfs',
    sender:{
      _id: 'abc',
      name: 'chaman2',
    },
    chat: 'chatId',
    createdAt: '2024-10-06T18:50:00.000Z'
  }
]