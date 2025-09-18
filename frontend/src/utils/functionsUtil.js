export function getFirstName(fullName) {
   let name = [];
   name = fullName.split(' ');

   return name[0];
}

export function getLastName(fullName) {
   let name = [];
   name = fullName.split(' ');
   if (name.length <= 2) {
      return name[name.length - 1];
   } else {
      name = name[1];
      name = name.replace(',', '');
      return name;
   }
}