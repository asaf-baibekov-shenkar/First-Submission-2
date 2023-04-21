$(function() {
	presentProjects();
    $('#new_project_button').click(function() {
        if ($('#list').find('.project[project_id=""]').length > 0) return;
        $('#list').append(ProjectCell.generateEmptyCell());
	});
	
	$('main-title text-center').html(window.projects.filter(project => project.id == window.currentProjectId)[0].name);
	
});

function presentProjects() {
	$('#list').html('');
	window.projects
		.map(project => new ProjectCell(project).generateCell())
		.forEach(cell => { $('#list').append(cell); });
}

$(document).on('DOMNodeInserted', '.project', function () {
	$(".project_component > .edit").click(function() {
		$(this).parent()
			.find("input")
			.attr("readonly", false)
			.css("text-decoration", "underline");
		$(this).addClass("d-none");
		$(this).parent()
			.find(".done")
			.removeClass("d-none");
	});
    
	$(".project_component > .done").click(function() {
		$(this).parent()
			.find("input")
			.attr("readonly", true)
			.css("text-decoration", "none");
		$(this).addClass("d-none");
		$(this).parent()
			.find(".edit")
			.removeClass("d-none");

        let project_id = $(this).closest('.project').attr("project_id");
        if (project_id == '') {
            let formData = new FormData();
            formData.append('title', $(this).parent().find("input").val());
			for (var pair of formData.entries()) {
				console.log(pair[0]+ ', ' + pair[1]); 
			}
        } else {
            let formData = new FormData();
            formData.append('id', project_id);
            formData.append('title', $(this).parent().find("input").val());
			for (var pair of formData.entries()) {
				console.log(pair[0]+ ', ' + pair[1]); 
			}
        }
	});

	$(".project_component > input").click(function() {
		if (!$(this).attr("readonly")) return;
	});

	const maxLength = $(".project_component > input").attr('maxlength');
	
    $(".project_component > input").on('input', function() {
		const minFontSize = 14;
		const maxFontSize = 22;
		const charRange = maxLength - $(this).val().length;
		let fontSize = minFontSize + ((charRange / maxLength) * (maxFontSize - minFontSize));
		fontSize = Math.max(minFontSize, fontSize);
		fontSize = Math.min(maxFontSize, fontSize);
		$(this).css('font-size', fontSize + 'px');
	});

	$(".project_component > input").attr('maxlength', maxLength).trigger('input');
	
	$(".project_component > .delete").click(function() {
		let formData = new FormData();
		formData.append('id', $(this).closest('.project').attr("project_id"));
		for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}
	});

	$('.project .project-description, .project input').on('click', function() {
		if ($(this).is('input') && $(this).attr('readonly') != 'readonly') return;
		let project_id = $(this).closest('.project').attr('project_id');
        if (project_id == '') return;
		window.location.href = window.location.href + 'tasks.html?project_id=' + project_id;
	});
})

class ProjectCell {
	constructor(project) {
		this.project = project;
	}

	generateCell() {
		return `
			<div class="project rounded" project_id="${this.project.project_id}">
				<div class="project_component rounded" project_id="">
					<button class="delete rounded-start">
						<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.99219 0.65625L5.33594 1.3125H3.00625H0.671875V2.64844V3.98438H10H19.3281V2.64844V1.3125H16.9938H14.6641L14.0078 0.65625L13.3516 -1.58325e-07H10H6.64844L5.99219 0.65625Z" fill="white"/>
							<path d="M1.99375 13.5797L2.00781 21.8203L2.11563 22.125C2.43438 23.0109 3.02031 23.5875 3.90625 23.8875C4.15469 23.9719 4.42188 23.9766 10 23.9766C15.5781 23.9766 15.8453 23.9719 16.0938 23.8875C16.9797 23.5875 17.5656 23.0109 17.8844 22.125L17.9922 21.8203L18.0063 13.5797L18.0156 5.34375H10H1.98438L1.99375 13.5797Z" fill="white"/>
						</svg>
					</button>
					<input type="text" maxlength="20" value="${this.project.title}" readonly />
					<button class="edit rounded-end">
						<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 16.0672V19.4445C0 19.7556 0.24441 20 0.55548 20H3.93279C4.07721 20 4.22164 19.9445 4.32162 19.8334L16.4533 7.71282L12.2872 3.54673L0.16664 15.6673C0.05555 15.7784 0 15.9117 0 16.0672ZM19.675 4.49104C20.1083 4.05777 20.1083 3.35787 19.675 2.92459L17.0754 0.324953C16.6421 -0.108317 15.9422 -0.108317 15.509 0.324953L13.4759 2.35801L17.642 6.52409L19.675 4.49104Z" fill="white"/>
						</svg>
					</button>
					<button class="done rounded-end d-none">
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_8_135)">
								<path d="M25.1379 4.48739L7.62577 22L-0.148315 14.2264L1.30699 12.7711L7.59317 19.0573L23.6505 3C24.1464 3.49597 24.6424 3.99194 25.1379 4.48739Z" fill="white" />
							</g>
							<defs>
								<clipPath id="clip0_8_135">
									<rect width="25" height="25" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</button>
				</div>
				<div class="project-description rounded-bottom h-100 p-3 d-flex flex-column align-items-center justify-content-between">
					<div class="d-flex flex-column align-items-center">
						<span>High Priority</span>
						<span>${this.project.high_priority_tasks}</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Medium Priority</span>
						<span>${this.project.medium_priority_tasks}</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Low Priority</span>
						<span>${this.project.low_priority_tasks}</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Remaining</span>
						<span>${this.project.remaining_tasks}</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Total</span>
						<span>${this.project.total_tasks}</span>
					</div>
				</div>
			</div>
		`
	}

	static generateEmptyCell() {
		return `
			<div class="project rounded" project_id="">
				<div class="project_component rounded" project_id="">
					<button class="delete rounded-start">
						<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.99219 0.65625L5.33594 1.3125H3.00625H0.671875V2.64844V3.98438H10H19.3281V2.64844V1.3125H16.9938H14.6641L14.0078 0.65625L13.3516 -1.58325e-07H10H6.64844L5.99219 0.65625Z" fill="white"/>
							<path d="M1.99375 13.5797L2.00781 21.8203L2.11563 22.125C2.43438 23.0109 3.02031 23.5875 3.90625 23.8875C4.15469 23.9719 4.42188 23.9766 10 23.9766C15.5781 23.9766 15.8453 23.9719 16.0938 23.8875C16.9797 23.5875 17.5656 23.0109 17.8844 22.125L17.9922 21.8203L18.0063 13.5797L18.0156 5.34375H10H1.98438L1.99375 13.5797Z" fill="white"/>
						</svg>
					</button>
					<input type="text" maxlength="20" value="" />
					<button class="edit rounded-end d-none">
						<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 16.0672V19.4445C0 19.7556 0.24441 20 0.55548 20H3.93279C4.07721 20 4.22164 19.9445 4.32162 19.8334L16.4533 7.71282L12.2872 3.54673L0.16664 15.6673C0.05555 15.7784 0 15.9117 0 16.0672ZM19.675 4.49104C20.1083 4.05777 20.1083 3.35787 19.675 2.92459L17.0754 0.324953C16.6421 -0.108317 15.9422 -0.108317 15.509 0.324953L13.4759 2.35801L17.642 6.52409L19.675 4.49104Z" fill="white"/>
						</svg>
					</button>
					<button class="done rounded-end">
						<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_8_135)">
								<path d="M25.1379 4.48739L7.62577 22L-0.148315 14.2264L1.30699 12.7711L7.59317 19.0573L23.6505 3C24.1464 3.49597 24.6424 3.99194 25.1379 4.48739Z" fill="white" />
							</g>
							<defs>
								<clipPath id="clip0_8_135">
									<rect width="25" height="25" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</button>
				</div>
				<div class="project-description rounded-bottom h-100 p-3 d-flex flex-column align-items-center justify-content-between">
					<div class="d-flex flex-column align-items-center">
						<span>High Priority</span>
						<span>0</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Medium Priority</span>
						<span>0</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Low Priority</span>
						<span>0</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Remaining</span>
						<span>0</span>
					</div>
					<div class="d-flex flex-column align-items-center">
						<span>Total</span>
						<span>0</span>
					</div>
				</div>
			</div>
		`
	}
}