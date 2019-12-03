echo "Ofuscando todos os arquivos .js em public/js"
cd ./public/js
for f_ile in *.js
do
javascript-obfuscator $f_ile --output $f_ile
done
cd ..
