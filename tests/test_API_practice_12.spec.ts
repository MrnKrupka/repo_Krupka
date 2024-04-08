import { test, expect } from "@playwright/test";

let idNewUser: string = '';
const baseUrl = 'https://reqres.in';

test('Should return list of the users', async ({ request }) => {
    const issues = await request.get(`${baseUrl}/api/users?page=2`);

    expect(issues.status()).toBe(200);

    const responseJson = await issues.json();

    expect(responseJson.page).toBe(2);
    expect(responseJson.per_page).toBe(6);
    expect(responseJson.total_pages).toBe(2);
    expect(responseJson.data.length).toBeGreaterThan(5);
    expect(responseJson.data[0].first_name).toBe("Michael");
    expect(responseJson.data).toContainEqual(
        expect.objectContaining({
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": `${baseUrl}/img/faces/10-image.jpg`
        })
    );
});


test('Check user creation', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/users`, {
        data: {
            "name": "Cat",
            "job": "Waiter",
        }
    });
    const responseJson = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    expect(responseJson.name).toBe("Cat");
    expect(responseJson.job).toBe("Waiter");

    let idNewUser = responseJson.id;
    console.log(idNewUser);

});


test('User update check', async ({ request }) => {
    const responseData = await request.put(`${baseUrl}/api/users/${idNewUser}`, {
        data: {
            "name": "Red Cat",
            "job": "Speed waiter"
        }
    });

    const responseDataJson = await responseData.json();
    console.log(responseDataJson)

    expect(responseData.status()).toBe(200);

    expect(responseDataJson.name).toBe("Red Cat");
    expect(responseDataJson.job).toBe("Speed waiter");
});


test('User delete check', async ({ request }) => {
    const resp = await request.delete(`${baseUrl}/api/users/${idNewUser}`);

    expect(resp.status()).toBe(204);
});