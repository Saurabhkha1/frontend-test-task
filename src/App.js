import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import BlogEditor from "./BlogEditor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const initialTopics = [
  {
    category: "Technology",
    topics: [
      {
        id: 1,
        name: "Artificial Intelligence",
        keywords: ["AI", "Machine Learning"],
      },
      {
        id: 2,
        name: "Blockchain",
        keywords: ["Cryptocurrency", "Decentralization"],
      },
    ],
  },
  {
    category: "Science",
    topics: [
      {
        id: 3,
        name: "Quantum Physics",
        keywords: ["Entanglement", "Superposition"],
      },
      { id: 4, name: "Genetics", keywords: ["DNA", "Genome"] },
    ],
  },
  {
    category: "ICP",
    topics: [
      {
        id: 3,
        name: "ICP Physics",
        keywords: ["Entanglement", "Superposition"],
      },
      { id: 4, name: "ICP", keywords: ["DNA", "Genome"] },
    ],
  },
  {
    category: "Mission",
    topics: [
      {
        id: 3,
        name: "Mission Physics",
        keywords: ["Mission", "Superposition"],
      },
      { id: 4, name: "Mission", keywords: ["DNA", "Genome"] },
    ],
  },
  {
    category: "Custom",
    topics: [],
  },
];

const App = () => {
  const [topics, setTopics] = useState(initialTopics);
  const [showForm, setShowForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", keywords: "" });
  const [currentCategory, setCurrentCategory] = useState(
    initialTopics[0].category
  );
  const [editorOpen, setEditorOpen] = useState(false);

  const customTabIndicatorStyle = {
    backgroundColor: "#ff9100",
    height: 4,
  };

  const handleOpenEditor = () => {
    setEditorOpen(true);
  };

  const handleAddTopic = () => {
    setShowForm(true);
  };

  const closeAddTopic = () => {
    setShowForm(false);
    setNewTopic({ name: "", keywords: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewTopic((prevTopic) => ({ ...prevTopic, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, keywords } = newTopic;
    const topic = { id: Date.now(), name, keywords: keywords.split(",") };
    setTopics((prevTopics) => {
      let data = prevTopics;
      data[4].topics = [...data[4].topics, topic];
      return data;
    });
    setShowForm(false);
    setNewTopic({ name: "", keywords: "" });
  };

  const handleDeleteTopic = (categoryId, topicId) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((category) => {
        if (category.category === categoryId) {
          category.topics = category.topics.filter(
            (topic) => topic.id !== topicId
          );
        }
        return category;
      });
      return updatedTopics;
    });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentCategory(newValue);
  };

  const generateRandomColor = (() => {
    const colors = [
      "#FFCCCC",
      "#CCFFCC7A",
      "#CCCCFF",
      "#FFFFCC",
      "#CCFFFF",
      "#FFCCFF",
    ];

    const colorMap = new Map();

    return (index) => {
      if (colorMap.has(index)) {
        return colorMap.get(index);
      }

      const color = colors[index % colors.length];
      colorMap.set(index, color);
      return color;
    };
  })();

  const generateBackgroundColor = (() => {
    const colors = [
      "#FF0000",
      "#00FF00",
      "#FF00FF",
      "#00FFFF",
      "#0000FF",
      "#FFFF00",
    ];

    const colorMap = new Map();

    return (index) => {
      if (colorMap.has(index)) {
        return colorMap.get(index);
      }

      const color = colors[index % colors.length];
      colorMap.set(index, color);
      return color;
    };
  })();

  const renderTopics = () => {
    const selectedCategory = topics.find(
      (category) => category.category === currentCategory
    );

    if (!selectedCategory) {
      return null;
    }

    return (
      <Card key={selectedCategory.category} variant="outlined">
        <CardContent>
          <p className="font-semibold text-sm ">Recommended Topics</p>
          <List>
            {selectedCategory.topics.map((topic) => (
              <ListItem className=" w-full flex flex-col" key={topic.id}>
                <div className="w-full flex align-baseline">
                  <ListItemText
                    primary={topic.name}
                    primaryTypographyProps={{ style: { fontWeight: "bold" } }}
                  />
                </div>
                <div className="w-full flex align-baseline justify-between">
                  <div>
                    {topic.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: generateRandomColor(index),
                          padding: "3px 4px",
                          margin: "0 2px",
                          borderRadius: "7px",
                          color: generateBackgroundColor(index),
                          border: `solid 1px ${generateBackgroundColor(index)}`,
                          fontWeight: "400",
                          fontSize: "12px",
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div>
                    <button
                      className="bg-[#ff9100] py-[7px] mx-1 rounded-md w-[100px] text-xs text-white"
                      onClick={handleOpenEditor}
                    >
                      Write <ArrowForwardIosIcon sx={{ fontSize: 11 }} />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteTopic(selectedCategory.category, topic.id)
                      }
                      className="text-xs font-black"
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Categoris
      </Typography>
      <div className="flex justify-between">
        <Tabs
          value={currentCategory}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Topic categories"
          fontWeight="800"
          TabIndicatorProps={{ style: customTabIndicatorStyle }}
        >
          {topics.map((category) => (
            <Tab
              key={category.category}
              label={category.category}
              value={category.category}
              style={{
                textTransform: "none",
                color: "black",
                fontWeight: "500",
                fontSize: "14px",
              }}
            />
          ))}
        </Tabs>
        <button
          className="bg-[#ff9100] p-1 m-1 rounded-md w-[100px] text-xs text-white"
          onClick={handleAddTopic}
        >
          Add Topic <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
        </button>
      </div>
      {renderTopics()}
      <Box mt={2}>
        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Topic Name"
                  name="name"
                  value={newTopic.name}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Keywords"
                  name="keywords"
                  value={newTopic.keywords}
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  className="bg-[#ff9100] py-[7px] mx-1 rounded-md w-[100px] text-xs text-white"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="border-solid border-[1px] border-[#ff9100] py-[7px] mx-1 rounded-md w-[100px] text-xs text-[#ff9100]"
                  onClick={closeAddTopic}
                >
                  Close
                </button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
      {editorOpen && (
        <Box mt={4}>
          <BlogEditor setEditorOpen={setEditorOpen} />
        </Box>
      )}
    </Box>
  );
};

export default App;
