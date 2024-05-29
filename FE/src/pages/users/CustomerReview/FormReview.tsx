import React from "react";

const FormReview = () => {
  return (
    <div id="form-review" className="form-review pt-6">
      <div className="heading4">Leave A comment</div>
      <form className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-6">
        <div className="name ">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="username"
            type="text"
            placeholder="Your Name *"
          />
        </div>
        <div className="mail ">
          <input
            className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
            id="email"
            type="email"
            placeholder="Your Email *"
          />
        </div>
        <div className="col-span-full message">
          <textarea
            className="border border-line px-4 py-3 w-full rounded-lg"
            id="message"
            name="message"
            rows={3}
            placeholder="Your message *"
            defaultValue={""}
          />
        </div>
        <div className="col-span-full flex items-start -mt-2 gap-2">
          <input
            type="checkbox"
            id="saveAccount"
            name="saveAccount"
            className="mt-1.5"
          />
          <label className="" htmlFor="saveAccount">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <div className="col-span-full sm:pt-3">
          <button className="button-main ">Submit Reviews</button>
        </div>
      </form>
    </div>
  );
};

export default FormReview;
