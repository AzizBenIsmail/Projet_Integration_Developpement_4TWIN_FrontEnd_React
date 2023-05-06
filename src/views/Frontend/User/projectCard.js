import {
    Badge,
    Button,
    Card,
    CardBody, 
    CardImg,
   Progress,

    Col, 
    
    CardText,
    CardTitle
  } from "reactstrap";
import { useNavigate } from "react-router-dom";

const ProjectCard = (props) => {
    const project= props.project
    const navigate = useNavigate()
  
    
    function moyenne(entier1, entier2) {
      const moyenne = (entier1 / entier2) * 100;
      return Math.floor(moyenne);
    }

    function isMontantActuelGreaterOrEqual(project) {
      return (
        project.montant_actuel >= project.montant_Final ||
        project.numberOfPeople <= project.numberOfPeople_actuel ||
        project.creator == props.user._id
      );
    }

    function getFirstTenWords(str) {
      // Supprimer les caractères de ponctuation et diviser la chaîne en mots
      const words = str.replace(/[^\w\s]|_/g, "").split(/\s+/);
  
      // Retourner les 10 premiers mots
      return words.slice(0, 10).join(" ");
    }

    return(
        <>
        <Col 
            lg="3"
            className="py-3 ml-1"
             >
                  
                  <Card style={{ width: "22rem"}} className="card-lift--hover shadow border-0">
                    <CardImg
                        alt="..."
                        src={`http://localhost:5000/images/${project.image_project}`}
                        top
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <CardBody>
                        <CardTitle>{project.title}</CardTitle>
                        <CardText>
                        {getFirstTenWords(project.description)} ....
                        </CardText>
                           
                          <div className="font-weight-bold" style={{marginBottom:"7px"}}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '5px',marginTop:"12px" }}>Domain:</p>
                                <Badge color="success" pill className="mr-5 ml-2" style={{ flex: '1' }}>
                                {project.domaine}
                                </Badge>
                                <p style={{ marginRight: '5px' ,marginTop:"12px"}}>Goal:</p>
                                <Badge color="warning" pill className="ml-2" style={{ flex: '1' }}>
                                {project.goal}
                                </Badge>
                            </div>

                            <div className="progress-wrapper">
                            <div className="progress-info">
                              <div className="progress-label">
                                <span>
                                  Task completed :{moyenne(
                                    project.montant_actuel,
                                    project.montant_Final
                                  )} %
                                </span>
                              </div>
                              <div className="progress-percentage">
                                <span>
                                {project.montant_actuel}/
                                  {project.montant_Final}
                                  <i className="fa fa-usd mr-2 ml-2" />
                                </span>
                              </div>
                            </div>
                            <Progress
                              max={project.montant_Final}
                              value={project.montant_actuel}
                              color="default"
                            />
                             {project.numberOfPeople_actuel}/
                            {project.numberOfPeople}
                            <i className="fa fa-users mr-2 ml-2" />
                          </div>

                          <Button
                            className="btn-1 mt-4"
                            color="primary"
                            outline
                            style={{width:"50%", padding: "2% 2%" }}
                            type="button"
                            onClick={(e) =>
                              navigate(
                                `/Projects_details/${project._id}/${project.creator}`
                              )
                            }
                          >
                            <i className="fa fa-eye mr-2" aria-hidden="true"></i>
                            More Details
                          </Button>
                
                          <Button

                            className="btn-1 ml-1 mt-4"
                            color="success"
                            outline
                            type="button"
                            style={{width:"45%", padding: "1% 1%"}}
                            onClick={(e) =>
                              navigate(`/AddInvest/${project._id}`)
                            }
                          >
                            <i className="fa fa-cubes mr-2" aria-hidden="true"></i>
                            Invest
                          </Button>
                            
                          </div>

                        
                    </CardBody>
                  </Card>
                  </Col>
        </>
    )
}

export default ProjectCard;