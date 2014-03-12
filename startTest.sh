rm -rf cssTestData cssTestApps test.pid
mkdir cssTestData cssTestApps
./arangod -c arangod.conf --pid-file test.pid &
sleep 3
casperjs test standalone/footerBar/footerBar.js
casperjs test standalone/navigationBar/navigationBar.js
casperjs test standalone/tabApplications/tabApplications.js
casperjs test standalone/compareAll.js
kill `cat test.pid`
