export const sampleChats = [
  {
    avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
    name: "John ",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
    name: "susy ",
    _id: "3",
    groupChat: true,
    members: ["1", "2", "3"],
  },
  {
    avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
    name: "remo ",
    _id: "4",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
    name: "John Boii",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      name: "John Boii",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],

    content: "lwde ki sarkar hai...",
    _id: "bcdedf",
    sender: {
      _id: "user._id",
      name: "chaman",
    },
    chat: "chatId",
    createdAt: "2024-10-06T18:30:00.000Z",
  },
  {
    attachments: [
      {
        public_id: "ab2",
        url: "https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg",
      },
    ],

    // content: 'lwde ki ki sarkar hai...',
    _id: "bcdedfdfs",
    sender: {
      _id: "abc",
      name: "chaman2",
    },
    chat: "chatId",
    createdAt: "2024-10-06T18:50:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      _id: "1",
      avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Boii",
      _id: "2",
      avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      username: "john_boii",
      friends: 8,
      groups: 7,
    },
  ],
  chats: [
    {
      name: "JethaLaal Khte",
      _id: "1",
      avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
      totalMembers: 15,
      groupChat: false,
      members: [
        {
          _id: "1",
          avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
        },
        {
          _id: "2",
          avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
        },
      ],
      totalMessages: 100,
      creator: {
        name: "John Doe",
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      },
    },
    {
      name: "Champak Chacha",
      _id: "2",
      avatar: ["https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png"],
      totalMembers: 11,
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
        },
        {
          _id: "2",
          avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
        },
      ],
      totalMessages: 100,
      creator: {
        name: "John Doe",
        avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png",
      },
    },
  ],
  messages:[
    {
      attachments: [],
      content: "lwde ki sarkar hai...",
      _id: "bcdedf",
      sender: {
        avatar: "https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg",
        name: "chaman",
      },
      chat: "abac",
      groupChat: false,
      createdAt: "2024-10-06T18:30:00.000Z",
    },
    {
      attachments: [
        {
          public_id: "ab2",
          url: "https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg",
        },
      ],
      content: "lwde ki",
      _id: "bcdedfdfs",
      sender: {
        avatar: "https://i.pinimg.com/736x/97/3c/fc/973cfcca079333c9657855db38bdc79f.jpg",
        name: "Chutia",
      },
      chat: "jii",
      groupChat: true,
      createdAt: "2024-10-06T18:50:00.000Z",
    }
  ]
};
