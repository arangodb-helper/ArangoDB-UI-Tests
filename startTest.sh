rm -rf cssTestData cssTestApps test.pid
mkdir cssTestData cssTestApps
./arangod -c arangod.conf --pid-file test.pid &
sleep 3
casperjs test standalone/footerBar/footerBar.js
kill `cat test.pid`
