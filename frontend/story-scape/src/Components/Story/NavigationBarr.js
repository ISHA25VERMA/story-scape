import { useMutation } from "@apollo/client";
import _ from "lodash";
import React from "react";
import { CREATE_CHAPTER, Chapter } from "../../Graphql/mutation/platform";
import { STORY_BY_ID } from "../../Graphql/query/platform";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

function NavigationBarr(props) {
  const { setSelectedTab, selected, storyId, story } = props;
  const chapters = story.chapters;
  const title = story.title;
  const coverImg = story.coverImageUrl ? story.coverImageUrl : "";
  console.log(chapters);
  console.log("c", story);

  const changeMainPage = (e) => {
    if (e.target.offsetParent.classList.contains("chapter")) {
      setSelectedTab(e.target.offsetParent.id);
    } else {
      setSelectedTab("story-title");
    }
  };

  const [createChapter, { data }] = useMutation(CREATE_CHAPTER, {
    update(
      cache,
      {
        data: {
          platform: {
            createChapter: { chapter },
          },
        },
      }
    ) {
      cache.modify({
        id: cache.identify(story),
        fields: {
          chapters(existingChapters = [], { readField }) {
            const newChapter = cache.writeFragment({
              data: chapter,
              fragment: Chapter,
            });

            if (
              existingChapters.some(
                (ref) => readField("id", ref) === newChapter.id
              )
            ) {
              return existingChapters;
            }

            return [...existingChapters, newChapter];
          },
        },
      });
    },
    refetchQueries: [{ query: STORY_BY_ID, variables: { storyId } }],
    variables: {
      input: { storyId, title: "CHAPTER TITLE", text: "" },
    },
  });

  const addChapter = () => {
    createChapter();
  };
  return (
    <div>
      <div>{title}</div>
      {!_.isEmpty(chapters) && (
        <List>
          {!_.isEmpty(chapters) &&
            chapters.map((chapter, index) => (
              <ListItem
                className={"chapter"}
                id={chapter.id}
                onClick={changeMainPage}
                key={chapter.id}
                disablePadding
              >
                <ListItemButton selected={selected === chapter.id}>
                  <ListItemText primary={chapter.title} />
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem onClick={addChapter} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Add Chapter"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <button onClick={addChapter}>ADD CHAPTER</button>
    </div>
  );
}

export default NavigationBarr;
