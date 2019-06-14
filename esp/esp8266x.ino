#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <WS2812FX.h>
#include <Adafruit_NeoPixel.h>

#define WIFI_SSID "WIFI_SETTINGS"
#define WIFI_PASSWORD "PASSWORD"

//#define STATIC_IP // uncomment for static IP, set IP below
#ifdef STATIC_IP
IPAddress ip(192, 168, 1, 123);
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
#endif

#define min(a, b) ((a) < (b) ? (a) : (b))
#define max(a, b) ((a) > (b) ? (a) : (b))

#define LED_PIN 2 // 0 = GPIO0, 2 = GPIO2
#define LED_COUNT 24

#define WIFI_TIMEOUT 30000 // checks WiFi every ...ms. Reset after this time, if WiFi cannot reconnect.
#define HTTP_PORT 80

#define DEFAULT_COLOR 0x2196f3
#define DEFAULT_BRIGHTNESS 190
#define DEFAULT_SPEED 1000
#define DEFAULT_MODE FX_MODE_STATIC

unsigned long auto_last_change = 0;
unsigned long last_wifi_check_time = 0;
String modes = "";
uint8_t myModes[] = {};
boolean auto_cycle = false;

WS2812FX ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
ESP8266WebServer server(HTTP_PORT);

void setup()
{
    Serial.begin(115200);
    Serial.println();
    Serial.println();
    modes.reserve(5000);
    ws2812fx.init();
    ws2812fx.setMode(DEFAULT_MODE);
    ws2812fx.setColor(DEFAULT_COLOR);
    ws2812fx.setSpeed(DEFAULT_SPEED);
    ws2812fx.setBrightness(DEFAULT_BRIGHTNESS);
    ws2812fx.start();
    wifi_setup();
    server.on("/modes", srv_handle_modes);
    server.on("/set", srv_handle_set);
    server.begin();
}

void loop()
{
    unsigned long now = millis();

    server.handleClient();
    ws2812fx.service();

    if (now - last_wifi_check_time > WIFI_TIMEOUT)
    {
        Serial.print("Checking WiFi... ");
        if (WiFi.status() != WL_CONNECTED)
        {
            Serial.println("WiFi connection lost. Reconnecting...");
            wifi_setup();
        }
        else
        {
            Serial.println("OK");
        }
        last_wifi_check_time = now;
    }

    if (auto_cycle && (now - auto_last_change > 10000))
    { 
        uint8_t next_mode = (ws2812fx.getMode() + 1) % ws2812fx.getModeCount();
        if (sizeof(myModes) > 0)
        { 
            for (uint8_t i = 0; i < sizeof(myModes); i++)
            {
                if (myModes[i] == ws2812fx.getMode())
                {
                    next_mode = ((i + 1) < sizeof(myModes)) ? myModes[i + 1] : myModes[0];
                    break;
                }
            }
        }
        ws2812fx.setMode(next_mode);
        Serial.print("mode is ");
        Serial.println(ws2812fx.getModeName(ws2812fx.getMode()));
        auto_last_change = now;
    }
}
void wifi_setup()
{
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WIFI_SSID);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    WiFi.mode(WIFI_STA);
#ifdef STATIC_IP
    WiFi.config(ip, gateway, subnet);
#endif

    unsigned long connect_start = millis();
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");

        if (millis() - connect_start > WIFI_TIMEOUT)
        {
            Serial.println();
            Serial.print("Tried ");
            Serial.print(WIFI_TIMEOUT);
            Serial.print("ms. Resetting ESP now.");
            ESP.reset();
        }
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.println();
}

void srv_handle_modes()
{
    server.send(200, "text/plain", modes);
}

void srv_handle_set()
{
    for (uint8_t i = 0; i < server.args(); i++)
    {

        if (server.argName(i) == "color")
        {
            uint32_t tmp = (uint32_t)strtol(server.arg(i).c_str(), NULL, 16);
            if (tmp >= 0x000000 && tmp <= 0xFFFFFF)
            {
                ws2812fx.setColor(tmp);
            }
        }

        if (server.argName(i) == "turn")
        {

            if (server.arg(i) == "false")
            {
                ws2812fx.stop();
            }

            if (server.arg(i) == "true")
            {
                ws2812fx.start();
            }
        }

        if (server.argName(i) == "brightness")
        {

            if (server.arg(i)[0])
            {
                uint8_t tmp = (uint8_t)strtol(server.arg(i).c_str(), NULL, 10);
                ws2812fx.setBrightness(tmp);
            }
        }

        if (server.argName(i) == "animation")
        {
            uint8_t tmp = (uint8_t)strtol(server.arg(i).c_str(), NULL, 10);
            ws2812fx.setMode(tmp % ws2812fx.getModeCount());
        }
    }
    server.send(200, "text/plain", "OK");
}