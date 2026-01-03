export const sampleRequests = [
  // ================= FINDER SIDE =================

  // 1. Finder - Verification Required (No questions yet)
  {
    _id: "1",
    itemId: { name: "Black Wallet" },
    finderId: { _id: "finder1", name: "Sarah Johnson" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "pending",
    questions: [],
    finderVerified: false,
    claimerVerified: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 mins ago
    requestType: "claim",
  },

  // 2. Finder - Decision Required (Questions generated, pending decision)
  {
    _id: "2",
    itemId: { name: "iPhone 13 Pro" },
    finderId: { _id: "finder1", name: "Sarah Johnson" },
    claimerId: { _id: "claimer2", name: "Emma Davis" },
    status: "pending",
    questions: [
      { question: "What color is the case?", answer: "" },
      { question: "Where did you last use it?", answer: "At the coffee shop" },
    ],
    finderVerified: false,
    claimerVerified: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    requestType: "claim",
  },

  // 3. Finder - Claim Rejected
  {
    _id: "3",
    itemId: { name: "AirPods Pro" },
    finderId: { _id: "finder1", name: "Sarah Johnson" },
    claimerId: { _id: "claimer3", name: "Alex Rodriguez" },
    status: "rejected",
    questions: [{ question: "What's the serial number?", answer: "A12345" }],
    finderVerified: false,
    claimerVerified: false,
    decisionAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    requestType: "claim",
  },

  // 4. Finder - Chat Available (Claim accepted, not returned)
  {
    _id: "4",
    itemId: { name: "MacBook Pro" },
    finderId: { _id: "finder1", name: "Sarah Johnson" },
    claimerId: { _id: "claimer4", name: "David Kim" },
    status: "accepted",
    questions: [{ question: "What's your employee ID?", answer: "EMP789" }],
    finderVerified: false,
    claimerVerified: false,
    decisionAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    requestType: "claim",
  },

  // 5. Finder - Item Returned (Both verified)
  {
    _id: "5",
    itemId: { name: "Samsung Galaxy Watch" },
    finderId: { _id: "finder1", name: "Sarah Johnson" },
    claimerId: { _id: "claimer5", name: "Lisa Wang" },
    status: "returned",
    questions: [{ question: "What's the watch face color?", answer: "Black" }],
    finderVerified: true,
    claimerVerified: true,
    decisionAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    requestType: "claim",
  },

  // ================= CLAIMER SIDE =================

  // 6. Claimer - Request Sent (Awaiting questions)
  {
    _id: "6",
    itemId: { name: "Nike Backpack" },
    finderId: { _id: "finder2", name: "James Wilson" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "pending",
    questions: [],
    finderVerified: false,
    claimerVerified: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    requestType: "claim",
  },

  // 7. Claimer - Questions Received (Need to answer)
  {
    _id: "7",
    itemId: { name: "Gaming Laptop" },
    finderId: { _id: "finder3", name: "Maria Garcia" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "pending",
    questions: [
      { question: "What's the brand of the laptop?", answer: "" },
      { question: "Describe any stickers on it?", answer: "" },
    ],
    finderVerified: false,
    claimerVerified: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    requestType: "claim",
  },

  // 8. Claimer - Under Review (Answers submitted, waiting decision)
  {
    _id: "8",
    itemId: { name: "Canon Camera" },
    finderId: { _id: "finder4", name: "Robert Brown" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "pending",
    questions: [
      { question: "What's the model number?", answer: "EOS R5" },
      { question: "What memory card type?", answer: "CFexpress" },
    ],
    finderVerified: false,
    claimerVerified: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    requestType: "claim",
  },

  // 9. Claimer - Claim Accepted
  {
    _id: "9",
    itemId: { name: "Bose Headphones" },
    finderId: { _id: "finder5", name: "Jennifer Lee" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "accepted",
    questions: [{ question: "What color are the ear cups?", answer: "Silver" }],
    finderVerified: false,
    claimerVerified: false,
    decisionAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    requestType: "claim",
  },

  // 10. Claimer - Claim Rejected
  {
    _id: "10",
    itemId: { name: "Designer Sunglasses" },
    finderId: { _id: "finder6", name: "Thomas Anderson" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "rejected",
    questions: [{ question: "What's the brand?", answer: "Ray-Ban" }],
    finderVerified: false,
    claimerVerified: false,
    decisionAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    requestType: "claim",
  },

  // 11. Claimer - Item Returned
  {
    _id: "11",
    itemId: { name: "Water Bottle" },
    finderId: { _id: "finder7", name: "Amanda Smith" },
    claimerId: { _id: "claimer1", name: "Mike Chen" },
    status: "returned",
    questions: [{ question: "What's the capacity?", answer: "1L" }],
    finderVerified: true,
    claimerVerified: true,
    decisionAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    requestType: "claim",
  },
];
