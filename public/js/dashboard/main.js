/* eslint no-alert: 0, func-names: 0, no-undef: 0, no-unused-vars: 0 */
// Events

// Utils
const utils = {
  slug: str => {
    str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

    const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeeiiiiooooouuuunc------';

    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  }
};

// Methods
function _insertIntoEditor(html, instance = 'content', replace = false) {
  if (html.length > 0) {
    if (replace) {
      tinymce.activeEditor.setContent(html, { format: 'raw' });
    } else {
      const oldHtml = tinymce.activeEditor.getContent();
      tinymce.activeEditor.setContent(oldHtml + html, { format: 'raw' });
    }
  }

  return false;
}

function _getFileExtension(filename) {
  return filename.split('.').pop();
}

function tinyMceChange() {
  $('#content-value').val(tinymce.activeEditor.getContent());
}

function blog() {
  return {
    insertAd: () => {
      // Insert Ad (Google Adsense)
      $('#insertAd').on('click', (e) => {
        e.preventDefault();
        _insertIntoEditor('[Ad:336x280]');
      });
    },
    insertCode: () => {
      // Insert Code
      $('#insertCode').on('click', (e) => {
        e.preventDefault();

        const filename = prompt('Enter the filename', 'script.js');
        const current = $('#codes').val();
        let code;

        if (filename) {
          let extension = filename.split('.').pop();
          extension = extension === 'js' ? 'javascript' : extension;

          code = `---${extension}:${filename}\n\n---\n\n`;

          $('#codes').val(current + code);

          _insertIntoEditor(`{{${filename}}}`);
        }
      });
    }
  };
}

function dashboard() {
  return {
    slug: () => {
      // When user writes the post title, then we add a slug for friendlyUrl field
      $('#title').on('keyup', () => {
        $('#slug').val(utils.slug($('#title').val()));
      });

      $('#category').on('keyup', () => {
        $('#categorySlug').val(utils.slug($('#category').val()));
      });

      $('#category').on('blur', () => {
        $('#categorySlug').val(utils.slug($('#category').val()));
      });

      $('#categorySlugBlock').css('display', 'none');
    },
    media: () => {
      $('#insertMedia').on('click', (e) => {
        console.log('entra insertMedia');
        $('#media').removeClass('hidden');

        $('body').css('overflow', 'hidden');

        e.stopPropagation();
      });

      $('#media').on('click', 'a', (e) => {
        if (!$('#media').hasClass('hidden')) {
          $('#media').addClass('hidden');
        }

        $('body').css('overflow-y', 'scroll');

        e.stopPropagation();
      });

      $('#searchMedia').on('click', (e) => {
        e.stopPropagation();
      });

      $('#searchMedia').keyup((e) => {
        const term = e.target.value;

        if (term.trim() === '') {
          $('.file').show();
        } else {
          $('.file').hide();
          $(`.file[title^="${term}"], .file[title$="${term}"`).show();
        }
      });
    },
    insertMedia: () => {
      $('.files .file .insert').on('click', function () {
        const type = $(this).data('type');
        const filename = $(this).data('filename');
        const url = $(this).data('url');
        let html;

        if (type === 'image') {
          html = `<img alt="${filename}" src="${url}" />`;
        } else {
          html = `<a href="${url}" target="_blank">${filename}</a>`;
        }

        $('#closemodal').click();
        $('body').css('overflow-y', 'scroll');
        const element = document.getElementById('content');
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });

        _insertIntoEditor(html);
      });
    },
    uploadFiles: () => {
      $('#mediaForm').on('submit', (e) => {
        e.preventDefault();

        const { files } = $('#files')[0];
        const formdata = new FormData();
        const action = $('#mediaForm').attr('action');
        const imageFormats = ['png', 'jpg', 'jpeg', 'gif'];
        const documentFormats = {
          pdf: 'pdf',
          docx: 'word',
          js: 'code',
          json: 'code',
          mp4: 'video',
          rar: 'zip',
          sql: 'code',
          zip: 'zip'
        };
        let isImage = false;

        for (let i = 0; i < files.length; i += 1) {
          formdata.append('files[]', files[i]);
        }

        $.ajax({
          url: action,
          type: 'post',
          contentType: false,
          data: formdata,
          processData: false,
          cache: false
        })
          .done(result => {
            const data = result;

            for (let i = 0; i < data.length; i += 1) {
              const file = data[i];
              const extension = _getFileExtension(file.name);
              let element;
              let icon;

              isImage = imageFormats.indexOf(extension) !== -1;

              if (isImage) {
                element = `
                  <div class="file" title="${file.name}" style="background-image: url(${file.url})">
                    <div class="options">
                      <a
                        data-type="${isImage ? 'image' : 'document'}"
                        data-filename="${file.name}"
                        data-url="${file.url}"
                        class="insert"
                      >
                        ${__.Dashboard.media.insert}
                      </a>
                      <a
                        target="_blank"
                        href="${file.url}"
                        class="download"
                      >
                        ${__.Dashboard.media.download}
                      </a>
                    </div>
                  </div>`;
              } else {
                if (documentFormats[extension]) {
                  icon = `fa-file-${documentFormats[extension]}-o`;
                } else {
                  icon = 'fa-file-text-o';
                }

                element = `
                  <div class="file" title="${file.name} - ${file.size}">
                    <i class="fa ${icon} ${documentFormats[extension]}"></i>

                    <p>
                      ${file.name}
                    </p>

                    <div class="options">
                      <a
                        data-type="${isImage ? 'image' : 'document'}"
                        data-filename="${file.name}"
                        data-url="${file.url}"
                        class="insert"
                      >
                        ${__.Dashboard.media.insert}
                      </a>
                      <a
                        target="_blank"
                        href="${file.url}"
                        class="download"
                      >
                        ${__.Dashboard.media.download}
                      </a>
                    </div>
                  </div>
                `;
              }

              $('.files').prepend(element);

              // Attaching events...
              dashboard().insertMedia();
            }
          });

        $('#mediaForm')[0].reset();
      });
    },
    toggleReadActionCheckboxes: () => {
      $('.readAction .tableCheckboxAll').on('change', (e) => {
        if (!$(e.target).is(':checked')) {
          $('.readAction .table .tableCheckbox').prop('checked', false);
        } else {
          $('.readAction .table .tableCheckbox').prop('checked', true);
        }
      });
    }
  };
}

function menu() {
  return {
    toggleMenu: () => {
      $('#openMenu').on('click', () => {
        if ($('.Sidebar').hasClass('hidden')) {
          $('.Sidebar').removeClass('hidden');
        } else {
          $('.Sidebar').addClass('hidden');
        }
      });

      $('.container').on('click', () => {
        if (!$('.Sidebar').hasClass('hidden')) {
          $('.Sidebar').addClass('hidden');
        }
      });
    }
  };
}

function appComplete(table, field, id = false, bind = false) {
  $.ajax({
    url: `/dashboard/${table}/all`,
    type: 'get',
    cache: false
  })
    .done(categories => {
      const selectorId = id || field;
      const value = $(`#${selectorId}`).val();
      let selected = '';
      let options = '';

      console.log(categories);

      categories
        .sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))
        .forEach(choice => {
          selected = choice.id == value ? 'selected' : ''; // eslint-disable-line
          options += `<option value="${id ? choice.id : choice[field]}" ${selected}>${choice[field]}</option>`;
        });

      const select = `
        <select id="${selectorId}Select" name="${id || field}" class="select temporal">
          ${options}
        </select>
      `;

      $(`#${selectorId}Block .${selectorId}`).html(select);

      const label = $(`#${id || field}Select option:selected`).text();
      const newField = selectorId.includes('Id')
        ? selectorId.substring(0, selectorId.length - 2)
        : selectorId;

      $(`#${newField}`).val(label);

      if (bind) {
        $(`#${bind.field}`).val(utils[bind.apply](label));
      }

      $(`#${selectorId}Select`).on('change', e => {
        const { target: { value } } = e;
        const label = $(`#${selectorId}Select > option[value='${value}']`).text();

        $(`#${newField}`).val(label);

        if (bind) {
          $(`#${bind.field}`).val(utils[bind.apply](label));
        }
      });
    })
    .fail(() => {
      $('.createAction .Create').html(`
        <p>The table <strong>${table}</strong> does not have records.</p>
        <p>Add records <strong><a href="/dashboard/${table}/create">here</a></strong></p>
      `);
    });
}

function handleUploadClick() {
  $('#uploadFileBtn').on('submit', (e) => {
    // get the destination url
    const url = $('#mediaForm').attr('action');
    // get the form fields
    input = document.getElementById('files');
    const formData = new FormData();
    formData.append('myFile', input.files[0]);
    // trigger the request
    $.ajax({
      url,
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      type: 'POST',
      success: data => data,
      error: (request, status, error) => {
        console.log('error ', error); // eslint-disable-line no-console
      }
    });
  });
}

function init() {
  const { location: { pathname = 'home' }, relationships } = window;

  handleUploadClick();

  if (pathname.includes('blog') || pathname.includes('pages')) {
    blog().insertAd();
    blog().insertCode();

    dashboard().slug();
    dashboard().media();
    dashboard().insertMedia();
    dashboard().uploadFiles();
  }

  if (relationships) {
    Object.keys(relationships).forEach(app => {
      if (pathname.includes(app)) {
        relationships[app].forEach(relationship => {
          appComplete(
            relationship.table,
            relationship.field,
            relationship.id,
            relationship.bind || false
          );
        });
      }
    });
  }

  dashboard().toggleReadActionCheckboxes();
  menu().toggleMenu();
}

init();
