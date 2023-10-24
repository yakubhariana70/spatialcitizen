import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChapterStory = (props) => {
  //ChapterDescription
  const ChapterDescription = ({ description }) => {
    return (
      <div dangerouslySetInnerHTML={{ __html: description }} />
    )
  };
  //Deteksi button pada section
  const [buttonActive, setButtonActive] = useState(false);

  // Membaca props story.buttonActive yang berasal dari config
  useEffect(() => {
    setButtonActive(props.story.buttonActive);
  }, [props.story]);

  return (
    <>
      <Card className="chapter-card">
        <Card.Body>
          <Card.Title className="fw-semibold"> {props.story.title} </Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle> */}
          <Card.Text className="card-text">
            <ChapterDescription description={props.story.description}/>
            <br />
            {buttonActive ? (
              <Link
                to="/map"
                className="btn btn-outline-success shadow-sm my-3"
              >
                {props.buttonText}
              </Link>
            ) : (
              ""
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChapterStory;
