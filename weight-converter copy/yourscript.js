const gram = 1000;
const pound = 2.20462;
const once = 35.274;

document.getElementById('output').style.visibility = 'hidden';

document.getElementById('kqInput').addEventListener('input', (e) => {
  let kq = e.target.value;
  if (kq === '') {
    document.getElementById('output').style.visibility = 'hidden';
  } else {
    document.getElementById('output').style.visibility = 'visible';
    if (kq > 0) {
      document.getElementById('gramsOutput').innerHTML = kq * gram;
      document.getElementById('pOutput').innerHTML = kq * pound;
      document.getElementById('ozOutput').innerHTML = kq * once;
    }
  }
});

// $(document).ready(function () {
//   $('#kqInput').on('input', function () {
//     let kq = $(this).val();
//     if (kq === '') {
//       $('#output').hide();
//     } else {
//       $('#output').show();
//       if (kq > 0) {
//         $('#gramsOutput').text(kq * gram);
//         $('#pOutput').text((kq * pound).toFixed(2));
//         $('#ozOutput').text((kq * once).toFixed(2));
//       }
//     }
//   });
// });
