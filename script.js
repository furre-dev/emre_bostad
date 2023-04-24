// Initialize and add the map

async function initMap() {
	/* // The location of house
	const house = { lat: 59.265200726513626, lng: 18.05651307106018 };
	// The map, centered at house
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: house,
		fullscreenControl: true,
	});
	// The marker, positioned at house
	const marker = new google.maps.Marker({
		position: house,
		map: map,
	}); */

	const renderLimit = 49;

	const resp = await fetch(
		"https://bostad.stockholm.se/Lista/AllaAnnonser?fbclid=IwAR3PWHBYMQu5u2eRHiIkQsrQ0qzVMtyZ6wY0cX76ar6pSfbtjzNIc66x-zY",
	);
	const data = await resp.json();
	console.log(data);

	const cont = document.querySelector(".container");
	const arr = [];
	data.forEach((item, index) => {
		let hissObalkong;
		let hyra;
		if (item.Hiss && item.Balkong) {
			hissObalkong = "Hiss & Balkong";
		} else if (!(item.Hiss || item.Balkong)) {
			hissObalkong = "";
		} else if (item.Hiss && !item.Balkong) {
			hissObalkong = "Hiss";
		} else {
			hissObalkong = "Balkong";
		}

		switch (item.Hyra) {
			case null:
				hyra = "?";
				break;
			case item.Hyra:
				hyra = item.Hyra;
				break;
		}

		if (index > renderLimit) {
			return;
		}

		//This will push each "Statsdel" into the array. Will not push if same
		//"Statdsdel" already exists. Can be useful for filtering on the website.
		/* if (!arr.includes(item.Stadsdel)) {
			console.log(index);
			arr.push(item.Stadsdel);
			console.log(arr);
		} */
		cont.innerHTML += `
        <div class="z-50 m-3 card relative h-[25rem] w-[16rem] bg-[#D0D2D5] rounded-xl overflow-hidden border border-gray-300">
        <a target="_blank" href="https://bostad.stockholm.se/${item.Url}"  class="z-10 uppercard h-3/4 rounded-b-2xl flex flex-col text-white justify-around p-3">
            <div class="streetNcity">
                <h1 class="text-3xl font-semibold">${item.Gatuadress}</h1>
                <h2 class="text-lg text-[#D9D9D9]">${item.Kommun}, ${item.Stadsdel}</h2>
            </div>
            <div class="properties font-extralight text-lg">
                <h2>${item.AntalRum} Rum</h2>
                <h2>${item.Yta}kvm</h2>
                <h2>Våning ${item.Vaning}</h2>
                <h2>${hissObalkong}</h2>
            </div>
            <h2 class="text-3xl">${hyra} kr/mån</h2>
        </a>
        <div class="-z-10 lowercard h-2/4 w-full absolute bottom-[-60px] left-0">
            <div class="h-full w-full" id="map${index}"></div>
        </div>
    </div>
        `;
	});

	data.forEach((item, index) => {
		if (index > renderLimit) {
			return;
		}
		// The location of house
		const house = { lat: item.KoordinatLatitud, lng: item.KoordinatLongitud };
		// The map, centered at house
		const map = new google.maps.Map(document.getElementById(`map${index}`), {
			zoom: 12,
			center: house,
			fullscreenControl: true,
		});
		// The marker, positioned at house
		const marker = new google.maps.Marker({
			position: house,
			map: map,
		});
	});
}

/* const cont = document.querySelector(".container");
	cont.innerHTML += `
        <div class="z-50 m-5 card relative h-[25rem] w-[15rem] bg-red-500 rounded-xl overflow-hidden border border-black">
            <div class="z-10 uppercard h-3/4 rounded-b-2xl flex flex-col text-white justify-around p-3">
                <div class="streetNcity">
                    <h1 class="text-3xl font-semibold">Krogtäppan 49</h1>
                    <h2 class="text-lg text-[#D9D9D9]">Stockholm, Haninge</h2>
                </div>
                <div class="properties font-extralight text-lg">
                    <h2>3 Rum</h2>
                    <h2>85kvm</h2>
                    <h2>Våning 2</h2>
                    <h2>Hiss & Balkong</h2>
                </div>
                <h2 class="text-3xl">4999kr/mån</h2>
            </div>
            <div class="-z-10 lowercard h-2/4 w-full absolute bottom-[-50px] left-0">
                <div class="h-full w-full" id="map${index}"></div>
            </div>
        </div>` */

window.initMap = initMap;
