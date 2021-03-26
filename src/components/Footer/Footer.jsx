import React from "../../../node_modules/react";
import Modal from "react-bootstrap/Modal";
import "./Footer.css";

/*
  The Footer has a link called Team that when clicked,
  triggers a modal window with more information about
  our group and why we decided to create this project.
  This modal will also have pictures of each member of 
  the team.
*/
const Footer = (props) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isSupportOpen, setIsSupportOpen] = React.useState(false);

	const showModal = () => {
		setIsOpen(true);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	const showSupportModal = () => {
		setIsSupportOpen(true);
	};

	const hideSupportModal = () => {
		setIsSupportOpen(false);
	};

	if (props.footer === "visualizer") {
		return (
			<footer id="sticky-footer-visualizer" class="bg-dark text-white-50">
				<div class="d-flex justify-content-center bd-highlight">
					<a class="footer nav-link" data-toggle="modal" onClick={showModal}>
						Team
					</a>

					<Modal class="center" show={isOpen} onHide={hideModal} size="lg">
						<Modal.Header className="teamHeader">
							<Modal.Title>
								<h1 className="title">Meet the Team!</h1>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div>
								<h1 className="hello"> Hello, World! </h1>
								<p class="lead">
									We are undergraduate Computer Science students at California State University, East Bay. As students that have
									taken Data Structures and Analysis of Algorithms, we understood the visual disconnect that some students struggle
									with when first learning about how certain algorithms are implemented with their respective data structures. Our
									goal of creating Algo-Interact was to help students better understand algorithms through an interactive and
									visually-appealing website.
								</p>
							</div>
							<div class="container">
								<div className="pt-4"></div>
								<div class="row">
									<div class="col">
										<img class="circular--portrait AC" src={"https://algointeract.s3.amazonaws.com/static/teamPhotos/AC.jpeg"} />
									</div>
									<div class="col-8">
										<h4 className="name">Anthony Carnero</h4>
										<p className="description">"I love spicy food and making pepper sauce."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/acarn506" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/anthony-carnero-6873ba1a5/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape jay"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-jay.jpg"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Jay Ivan Gentallan</h4>
										<p className="description">"I like to play the guitar and drink Monster Energy."</p>

										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/jaygentallan" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/jay-ivan-gentallan-846729163/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
											<a class="mr-3" href="http://jaygentallan.com" target="_blank">
												<i class="uil uil-window"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-baljeet.jpeg"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Baljeet Singh</h4>
										<p className="description">"I can't go one day without drinking chai."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/baljeetsohal84" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/baljeet-singh-603203139/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-mikaela.JPG"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Mikaela Valenciano</h4>
										<p className="description">"I love attending concerts, playing guitar, and drawing."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/mikaelajhv" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/mikaelajhv/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-5"></div>
						</Modal.Body>
					</Modal>

					<a class="footer nav-link" data-toggle="modal" onClick={showSupportModal}>
						Support
					</a>

					<Modal class="center" show={isSupportOpen} onHide={hideSupportModal} size="lg">
						<Modal.Header className="teamHeader">
							<Modal.Title>
								<h1 className="title">Support Us!</h1>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div>
								<p class="lead">If you would like to support us, please contact this email: jaygentallan926@gmail.com</p>
							</div>
						</Modal.Body>
					</Modal>
				</div>

				<div className="container text-center">
					<small>Copyright &copy; 2020 Algo-Interact</small>
				</div>
			</footer>
		);
	} else {
		return (
			<footer id="sticky-footer" class="bg-dark text-white-50">
				<div class="d-flex justify-content-center bd-highlight">
					<a class="footer nav-link" data-toggle="modal" onClick={showModal}>
						Team
					</a>

					<Modal class="center" show={isOpen} onHide={hideModal} size="lg">
						<Modal.Header className="teamHeader">
							<Modal.Title>
								<h1 className="title">Meet the Team!</h1>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div>
								<h1 className="hello"> Hello, World! </h1>
								<p class="lead">
									We are undergraduate Computer Science students at California State University, East Bay. As students that have
									taken Data Structures and Analysis of Algorithms, we understood the visual disconnect that some students struggle
									with when first learning about how certain algorithms are implemented with their respective data structures. Our
									goal of creating Algo-Interact was to help students better understand algorithms through an interactive and
									visually-appealing website.
								</p>
							</div>
							<div class="container">
								<div className="pt-4"></div>
								<div class="row">
									<div class="col">
										<img class="circular--portrait AC" src={"https://algointeract.s3.amazonaws.com/static/teamPhotos/AC.jpeg"} />
									</div>
									<div class="col-8">
										<h4 className="name">Anthony Carnero</h4>
										<p className="description">"I love spicy food and making pepper sauce."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/acarn506" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/anthony-carnero-6873ba1a5/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape jay"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-jay.jpg"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Jay Ivan Gentallan</h4>
										<p className="description">"I like to play guitar and compete in coding comptetitons!"</p>

										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/jaygentallan" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/jay-ivan-gentallan-846729163/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
											<a class="mr-3" href="http://jaygentallan.me" target="_blank">
												<i class="uil uil-window"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-baljeet.jpeg"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Baljeet Singh</h4>
										<p className="description">"I can't go one day without drinking chai."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/baljeetsohal84" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/baljeet-singh-603203139/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>

								<div className="pt-4"></div>
								<div class="row pt-3">
									<div class="col">
										<img
											class="circular--landscape"
											src="https://algointeract.s3.amazonaws.com/static/teamPhotos/photo-mikaela.JPG"
										/>
									</div>
									<div class="col-8">
										<h4 className="name">Mikaela Valenciano</h4>
										<p className="description">"I love attending concerts, playing guitar, and drawing."</p>
										<div class="row pl-2">
											<a class="mr-3" href="https://github.com/mikaelajhv" target="_blank">
												<i class="uil uil-github-alt"></i>
											</a>
											<a class="mr-3" href="https://www.linkedin.com/in/mikaelajhv/" target="_blank">
												<i class="uil uil-linkedin-alt"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-5"></div>
						</Modal.Body>
					</Modal>

					<a class="footer nav-link" data-toggle="modal" onClick={showSupportModal}>
						Support
					</a>

					<Modal class="center" show={isSupportOpen} onHide={hideSupportModal} size="lg">
						<Modal.Header className="teamHeader">
							<Modal.Title>
								<h1 className="title">Support Us!</h1>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div>
								<p class="lead">If you would like to support us, please contact this email: jaygentallan926@gmail.com</p>
							</div>
						</Modal.Body>
					</Modal>
				</div>

				<div className="container text-center">
					<small>Copyright &copy; 2020 Algo-Interact</small>
				</div>
			</footer>
		);
	}
};

export default Footer;
