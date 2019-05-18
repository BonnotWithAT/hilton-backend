import React from "react";
import { shallow } from "enzyme";
import Reservation from "../components/Reservation";

const fakeReservation = {
  name: "John Bonnot",
  hotelName: "Hilton",
  arrivalDate: "2020-03-02T00:00:00.000Z",
  departureDate: "2020-03-03T00:00:00.000Z"
};

describe("sample test 101", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Reservation reservation={fakeReservation} />);
    console.log(wrapper.debug());
  });
});
