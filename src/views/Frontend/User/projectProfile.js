import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";

import {
    Badge,
    Button,
    Card,
    CardBody, 
    CardImg,
   Progress,
    Container,
    Row,
    Col, 
    
    CardText,
    CardTitle
  } from "reactstrap";
import ProjectCard from "./projectCard";


const ProjectProfile = (props) => {
  
  const projects = props.projects;
 

 
  console.log(projects)
  const breakPoints = [
    { width: 1, itemsToShow: 2 , itemsToScroll: 2},
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 2 }
  
  ];

    return (
      <>
      <Row className="text-center justify-content-center">
              <Col lg="10">
                <p className="lead" style={{color:"#1A3A46"}}>
                 <strong> {props.paragraph} </strong>
                </p>
              </Col>
            </Row>
            <Carousel breakPoints={breakPoints}>
                {projects.map((project, index) => (
                  
                        <Row className="justify-content-center ml-3" key={index+1} >
                      
                        <Col>
                        <Row className="row-grid">
                      
                            <ProjectCard project={project} user={props.user}/>
                        
                        </Row>
                      
                        </Col>
                        </Row>
                  
               ))}
              </Carousel>
      
    
       
       
                
                 
                  
                
          </>
                  );
  }
export default ProjectProfile;