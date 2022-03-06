/* eslint-disable quotes, semi, comma-dangle */

const formTemplate = [
  {
    name: "nickname",
    topic: "暱稱",
    topicDescription: false,
    type: "text",
    placeholder: "您的暱稱",
    required: true,
  },
  {
    name: "email",
    topic: "電子郵件",
    topicDescription: false,
    type: "text",
    placeholder: "您的電子郵件",
    required: true,
  },
  {
    name: "phone",
    topic: "電話",
    topicDescription: false,
    type: "text",
    placeholder: "您的電話",
    required: true,
  },
  {
    name: "signUp",
    topic: "報名類型",
    topicDescription: false,
    type: "radio",
    placeholder: "您的選項",
    options: [
      {
        optionName: "inBed",
        optionTopic: "躺在床上用想像力實作",
      },
      {
        optionName: "onTheFloor",
        optionTopic: "趴在地上滑手機找現成的",
      },
    ],
    required: true,
  },
  {
    name: "aware",
    topic: "怎麼知道這個活動的",
    topicDescription: false,
    type: "text",
    placeholder: "您的回答",
    required: true,
  },
  {
    name: "other",
    topic: "其他",
    topicDescription: "對活動的一些建議",
    type: "text",
    placeholder: "您的回答",
    required: false,
  },
];

export default formTemplate;
