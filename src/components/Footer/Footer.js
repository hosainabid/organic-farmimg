import React from "react";

export default function Footer() {
	return (
		<footer className="bg-dark py-5">
			<div className="container text-center" id="mc_embed_signup">
				<form
					action="https://gmail.us1.list-manage.com/subscribe/post?u=fc70fcdc4fbf05075af361a97&amp;id=cfa44d70ea"
					method="post"
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					className="validate"
					target="_blank"
					noValidate
				>
					<div id="mc_embed_signup_scroll">
						<h2>Signup for agricultural books</h2>
						<div className="indicates-required">
							<span className="asterisk">*</span> indicates
							required
						</div>
						<div className="mc-field-group">
							<label htmlFor="mce-EMAIL">
								Email Address{" "}
								<span className="asterisk">*</span>
							</label>
							<input
								type="email"
								name="EMAIL"
								className="required email"
								id="mce-EMAIL"
							/>
						</div>
						<div className="mc-field-group">
							<label htmlFor="mce-FNAME">First Name </label>
							<input
								type="text"
								name="FNAME"
								className=""
								id="mce-FNAME"
							/>
						</div>
						<div id="mce-responses" className="clear foot">
							<div
								className="response"
								id="mce-error-response"
								style={{ display: `none` }}
							></div>
							<div
								className="response"
								id="mce-success-response"
								style={{ display: `none` }}
							></div>
						</div>
						{/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
						<div
							style={{ position: `absolute`, left: `-5000px` }}
							aria-hidden="true"
						>
							<input
								type="text"
								name="b_fc70fcdc4fbf05075af361a97_cfa44d70ea"
								tabIndex="-1"
							/>
						</div>
						<div className="optionalParent">
							<div className="clear foot">
								<input
									type="submit"
									defaultValue="Subscribe"
									name="subscribe"
									id="mc-embedded-subscribe"
									className="button"
								/>
								<p className="brandingLogo">
									<a
										href="http://eepurl.com/hZW4Pz"
										title="Mailchimp - email marketing made easy and fun"
									>
										<img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg" />
									</a>
								</p>
							</div>
						</div>
					</div>
				</form>
			</div>
		</footer>
	);
}
