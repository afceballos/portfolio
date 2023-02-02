import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg"

export const Contact = () => {
    const formInitialDatails = {
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        massege:''
    }

    const [formDatails, setFormDetails] = useState(formInitialDatails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDatails,
            [category] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formDatails),
        });
        setButtonText("Send");
        let result = await response.json();
        setFormDetails(formInitialDatails);
        if (result.code == 200) {
          setStatus({ succes: true, message: 'Message sent successfully'});
        } else {
          setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
        }
      };

    return(
        <section className="contact" id="connect" >
            <Container>
                <Row>
                    <Col md={6}>
                        <img src={contactImg} alt="contact Us"/>
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type='text' value={formDatails.firstName} placeholder='First Name' 
                                    onChange={(e) => onFormUpdate('fistName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type='text' value={formDatails.lastName} placeholder='Last Name' 
                                    onChange={(e) => onFormUpdate('Lastname', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type='email' value={formDatails.email} placeholder='E-mail Address' 
                                    onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type='tel' value={formDatails.phone} placeholder='Phone No.' 
                                    onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea row='6' value={formDatails.massege} placeholder='Message' 
                                    onChange={(e) => onFormUpdate('massege', e.target.value)}/>
                                    <button type="submit" ><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? 'danger': 'success'} ></p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>

        </section>
    )

}