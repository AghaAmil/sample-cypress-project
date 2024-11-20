describe("BookCart Search and Filter Tests", () => {
    beforeEach(() => {
        // Visit the BookCart website
        cy.visit("https://bookcart.azurewebsites.net/");

        // Wait for the page to load completely by checking its filter container
        cy.get("div[class='filter-container']").should('be.visible');
    });

    it("should filter romance books under ₹1000", () => {
        // Select Romance category
        cy.get("mat-nav-list[aria-disabled='false']").contains("Romance").click();

        // Adjust price slider to ₹1000
        cy.get("mat-slider[class*='m-0'] input[type='range']").invoke('val', 1000).trigger('input').trigger('change')

        // Verify filtered results
        cy.get("app-book-card").each(($book) => {
            // Verify price is under ₹1000
            cy.wrap($book)
                .find("p")
                .invoke("text")
                .then((text) => {
                    const price = parseFloat(text.replace("₹", ""));
                    expect(price).to.be.lte(1000);
                });
        });

        // Verify book card elements
        cy.get("app-book-card")
            .first()
            .within(() => {
                cy.get(".card-title.my-2").should("be.visible");
                cy.get("p").should("be.visible");
                cy.get("img").should("be.visible");
                cy.get("button").contains("Add to Cart").should("be.visible");
            });
    });

    it("should handle no results scenario", () => {
        // Apply filters that would result in no matches
        cy.get("mat-nav-list[aria-disabled='false']").contains("Romance").click();
        cy.get("mat-slider[class*='m-0'] input[type='range']").invoke('val', 111).trigger('input').trigger('change')

        // Verify no results message
        cy.get("div[class$='mb-3']").contains('No books found').should("be.visible");
    });
});
