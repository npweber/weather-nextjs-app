import { getCityFromBrowserIP } from "../app/lib/geolocate-ip"

// Debug test on Los Angeles IP to see if the IP is being geolocated correctly
describe("getCityFromLABrowserIP", () => {
    it("should return the city of the browser IP", async () => {
        const city = await getCityFromBrowserIP("75.223.225.147")
        expect(city).toBe("Los Angeles")
    })
});